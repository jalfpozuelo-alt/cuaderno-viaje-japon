import {useEffect,useState} from 'react';

type Rate={rate:number;date:string;checkedAt:string};
const cacheKey='cuaderno-japon-eur-jpy-v1';
const endpoint='https://api.frankfurter.dev/v2/rate/eur/jpy';
const money=(value:number,currency:'EUR'|'JPY')=>new Intl.NumberFormat('es-ES',{style:'currency',currency,maximumFractionDigits:currency==='JPY'?0:2}).format(value);

function cachedRate():Rate|null{try{const saved=JSON.parse(localStorage.getItem(cacheKey)||'null');return saved&&Number.isFinite(saved.rate)&&saved.rate>0?saved:null;}catch{return null;}}

export function CurrencyTool(){
  const [rate,setRate]=useState<Rate|null>(cachedRate);
  const [amount,setAmount]=useState('1000');
  const [state,setState]=useState<'loading'|'ready'|'offline'>('loading');
  useEffect(()=>{
    const controller=new AbortController();
    fetch(endpoint,{signal:controller.signal,cache:'no-store'}).then(async response=>{
      if(!response.ok)throw new Error('rate');
      const data=await response.json() as {rate?:number;date?:string};
      if(!Number.isFinite(data.rate)||!data.rate||data.rate<=0||!data.date)throw new Error('rate');
      const latest={rate:data.rate,date:data.date,checkedAt:new Date().toISOString()};
      localStorage.setItem(cacheKey,JSON.stringify(latest));setRate(latest);setState('ready');
    }).catch(error=>{if(error?.name!=='AbortError')setState('offline');});
    return()=>controller.abort();
  },[]);
  const yen=Number(amount.replace(',','.'));
  const valid=Number.isFinite(yen)&&yen>=0;
  const dated=rate?new Intl.DateTimeFormat('es-ES',{dateStyle:'medium'}).format(new Date(`${rate.date}T12:00:00`)):'';
  const checked=rate?new Intl.DateTimeFormat('es-ES',{dateStyle:'short',timeStyle:'short'}).format(new Date(rate.checkedAt)):'';
  return <section className="currency-tool" aria-labelledby="currency-title">
    <div><p className="eyebrow">AYUDA PARA LOS PRECIOS</p><h3 id="currency-title">Yenes en euros</h3><p>Introduce el precio que ves en Japón y calcula su equivalente orientativo.</p></div>
    <div className="currency-controls"><label htmlFor="yen-input">Precio en yenes (¥)</label><input id="yen-input" type="number" inputMode="decimal" min="0" value={amount} onChange={event=>setAmount(event.target.value)}/><strong aria-live="polite">{rate&&valid?money(yen/rate.rate,'EUR'):'—'}</strong></div>
    <p className="currency-meta">{rate?`Referencia: ${money(rate.rate,'JPY')} por 1 €. Cotización del ${dated}; consultada el ${checked}. ${state==='offline'?'Sin conexión: se muestra la última cotización guardada.':''}`:state==='loading'?'Consultando la cotización…':'No hay conexión ni una cotización guardada.'} El cambio de tu banco puede incluir comisiones. <a href="https://frankfurter.dev/" target="_blank" rel="noreferrer">Fuente: Frankfurter ↗</a></p>
  </section>;
}
