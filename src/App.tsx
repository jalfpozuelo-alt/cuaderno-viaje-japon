import {useEffect,useMemo,useState} from 'react';
import {defaultTrip} from './data/defaultTrip';
import {transportGuide} from './data/transportGuide';
import {CurrencyTool} from './CurrencyTool';
import {localSuggestions} from './localSuggestions';
import type {Day,GuideStep,Place,Transport} from './types';

const trip=defaultTrip;
const coverPhoto='https://commons.wikimedia.org/wiki/Special:FilePath/FUS%20-%20Torii%20gates%20among%20trees%20at%20Fushimi%20Inari-taisha%2C%20Kyoto%2C%20Japan%2C%202015.jpg?width=1200';
const maps=(name:string)=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
const directions=(from:string,to:string,mode:string)=>`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=${mode}`;
type Saved={tasks:Record<string,boolean>;visits:Record<string,boolean>;notes:Record<string,string>};
const storageKey='cuaderno-japon-producto-v1';
function readSaved():Saved{try{const raw=JSON.parse(localStorage.getItem(storageKey)||'{}');return {tasks:raw.tasks||{},visits:raw.visits||{},notes:raw.notes||{}};}catch{return {tasks:{},visits:{},notes:{}};}}
const sections=['inicio','ruta','dias','preparar','estancias','costumbres'];

export default function App(){
  const [active,setActive]=useState(0);
  const [saved,setSaved]=useState<Saved>(readSaved);
  const [view,setView]=useState('inicio');
  const day=trip.days[active];
  const tasks=trip.preparation||[];
  const completed=tasks.filter(task=>saved.tasks[task.id]).length;
  const tripStages=useMemo(()=>Array.from(new Set(trip.days.map(item=>item.city).filter(city=>city!=='Regreso'))),[]);
  useEffect(()=>{localStorage.setItem(storageKey,JSON.stringify(saved));},[saved]);
  useEffect(()=>{
    let frame=0;
    const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
      const marker=window.scrollY+window.innerHeight*.36;
      let current='inicio';
      for(const id of sections){const el=document.getElementById(id);if(el&&el.offsetTop<=marker)current=id;}
      setView(current);
    });};
    window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);cancelAnimationFrame(frame);};
  },[]);
  const navigate=(target:string)=>{setView(target);requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView({behavior:'smooth'}));};
  const chooseDay=(index:number)=>{setActive(index);navigate('dias');};
  const toggleTask=(id:string)=>setSaved(s=>({...s,tasks:{...s.tasks,[id]:!s.tasks[id]}}));
  const toggleVisit=(id:string)=>setSaved(s=>({...s,visits:{...s.visits,[id]:!s.visits[id]}}));
  const setNote=(id:string,value:string)=>setSaved(s=>({...s,notes:{...s.notes,[id]:value}}));
  return <>
    <header className="topbar"><button className="brand brand-button" onClick={()=>navigate('inicio')}><span className="brand-mark">旅</span><span>CUADERNO <i>de viaje</i></span></button><span className="edition">GUÍA DE AUTOR <b>·</b> JAPÓN 2027</span><span className="edition author-tag">ALFONSO POZUELO</span></header>
    <main className="shell">
      <section className="hero" id="inicio"><div className="hero-image" style={{backgroundImage:`linear-gradient(180deg,transparent 70%,rgba(24,28,23,.45)),url('${coverPhoto}')`}} role="img" aria-label="Torii rojos de Fushimi Inari, Kioto"/><div className="hero-copy"><p className="kicker"><span className="sun"/> 13 DÍAS POR JAPÓN <span className="kanji">日本 · 旅</span></p><h1>Japón,<br/><em>a nuestro ritmo.</em></h1><p className="hero-lede">De Osaka a Tokio, por Kumano, Kioto y Takayama. Una guía para disfrutar del camino y saber siempre cuál es el siguiente paso.</p><div className="author"><span className="author-avatar">旅</span><span><b>Un viaje de autor</b><small>Por Alfonso Pozuelo · Mayo de 2027</small></span></div></div><div className="hero-caption"><span>JAPÓN · MAYO 2027</span><span>OSAKA → TOKIO</span></div></section>
      <section className="route-overview" id="ruta"><div className="section-head"><div><p className="eyebrow">LA RUTA EN UNA MIRADA</p><h2>Trece días.<br/><em>Un viaje completo.</em></h2></div><span className="route-stamp">日本<br/>旅</span></div><div className="route-line">{tripStages.map((city,index)=><div className="stage-piece" key={city}><div className="route-stop"><span>{String(index+1).padStart(2,'0')}</span><b>{city}</b></div>{index<tripStages.length-1&&<div className="route-connector"/>}</div>)}</div><div className="route-foot"><span>13 — 25 MAYO 2027</span><span>{trip.days.length} JORNADAS</span><button onClick={()=>navigate('estancias')}>VER ESTANCIAS ↗</button></div><details className="provider-details"><summary>Operadores y billetes oficiales</summary><div className="provider-list">{trip.providers.map(provider=><a key={provider.name} href={provider.url} target="_blank" rel="noreferrer"><b>{provider.name}</b><span>{provider.description}</span><span>Consultar ↗</span></a>)}</div></details></section>
      <section className="day-section" id="dias"><div className="section-head day-head"><div><p className="eyebrow">EL CUADERNO ABIERTO</p><h2><em>{day.city}</em></h2></div><p className="section-note">Selecciona el día.<br/>Consulta el recorrido y cada detalle.</p></div><div className="day-layout"><div className="day-rail" role="tablist" aria-label="Jornadas del viaje">{trip.days.map((item,index)=><button key={item.id} className={`day-tab ${index===active?'active':''}`} role="tab" aria-selected={index===active} onClick={()=>chooseDay(index)}><span>{String(index+1).padStart(2,'0')}</span><small>{item.city}</small></button>)}</div><article className="day-panel"><div className="day-photo" style={{backgroundImage:`url('${day.image}')`}}><span>{day.date.toUpperCase()}</span><span>JORNADA {String(active+1).padStart(2,'0')}</span></div><div className="day-content"><p className="eyebrow">{day.city.toUpperCase()} · {day.date.toUpperCase()}</p><h3 className="product-day-title">{day.title}</h3><p className="day-summary">{day.summary}</p>
        {day.id==='15'?<DayThree day={day} saved={saved} toggleVisit={toggleVisit}/>:<RegularDay day={day} saved={saved} toggleVisit={toggleVisit}/>}
        {day.foodTips?.length?<section className="content-block"><h4>Para comer, si apetece</h4>{day.foodTips.map(food=><div className="food-tip" key={food.id}><small>{food.style.toUpperCase()}</small><b>{food.title}</b><p>{food.detail}</p><div className="step-links"><a href={food.map} target="_blank" rel="noreferrer">Google Maps ↗</a>{food.official&&<a href={food.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div></div>)}</section>:null}
        {localSuggestions[day.id]?.length?<section className="content-block"><h4>Si os apetece explorar</h4><p className="section-context">Ideas opcionales de barrio y comida; comprobad horarios y mantened el recorrido principal como prioridad.</p>{localSuggestions[day.id].map(item=><div className="food-tip" key={item.title}><small>{item.kind.toUpperCase()}</small><b>{item.title}</b><p>{item.detail}</p><div className="step-links"><a href={item.map} target="_blank" rel="noreferrer">Google Maps ↗</a><a href={item.source} target="_blank" rel="noreferrer">Fuente ↗</a></div></div>)}</section>:null}
        {day.notes.length>0&&<section className="content-block"><h4>Información práctica</h4>{day.notes.filter(note=>day.id!=='15'||(!note.startsWith('Reunión de ambos grupos:')&&!note.startsWith('Alternativa para el grupo que no camina:'))).map((note,index)=><p className="practical-note" key={index}>{note}</p>)}</section>}
        {trip.hotels.find(hotel=>hotel.id===day.hotelId)&&<HotelCard hotelId={day.hotelId!}/>}
        <label className="personal-note">Tu nota para esta jornada<textarea value={saved.notes[day.id]||''} onChange={event=>setNote(day.id,event.target.value)} placeholder="Una idea, una reserva o algo que quieras recordar…"/></label>
      </div></article></div></section>
      <section className="essentials" id="preparar"><div className="essential-intro"><p className="eyebrow">ANTES DE SALIR</p><h2>Las cosas importantes,<br/><em>resueltas a tiempo.</em></h2><p>Preparativos basados en el viaje real. Tus casillas se guardan en este dispositivo.</p><div className="progress-label"><span>{completed} de {tasks.length} preparativos listos</span><span>{tasks.length?Math.round(completed/tasks.length*100):0}%</span></div><div className="progress-track"><span style={{width:`${tasks.length?Math.round(completed/tasks.length*100):0}%`}}/></div></div><div className="task-list"><CurrencyTool/>{tasks.map(task=><label className={`task ${saved.tasks[task.id]?'done':''}`} key={task.id}><input type="checkbox" checked={!!saved.tasks[task.id]} onChange={()=>toggleTask(task.id)}/><span className="checkmark"/><span><b>{task.title}</b><small>{task.group} · {task.timing}</small><small>{task.detail}</small>{task.official&&<a href={task.official} target="_blank" rel="noreferrer" onClick={event=>event.stopPropagation()}>Fuente oficial ↗</a>}</span></label>)}</div></section>
      <section className="extra-section" id="estancias"><p className="eyebrow">DÓNDE DORMIR</p><h2>Estancias del viaje</h2><div className="hotel-grid">{trip.hotels.map(hotel=><article key={hotel.id}><small>{hotel.dates}</small><h3>{hotel.name}</h3><p>{hotel.address}</p><p>{hotel.note}</p><div className="step-links"><a href={hotel.map} target="_blank" rel="noreferrer">Google Maps ↗</a>{hotel.official&&<a href={hotel.official} target="_blank" rel="noreferrer">Web ↗</a>}</div></article>)}</div></section>
      {!!trip.manners?.length&&<section className="extra-section" id="costumbres"><p className="eyebrow">VIAJAR CON RESPETO</p><h2>Buenas prácticas</h2><div className="manners-grid">{trip.manners.map(group=><article key={group.id}><h3>{group.title}</h3>{group.tips.map(tip=><div key={tip.id}><b>{tip.title}</b><p>{tip.detail}</p>{tip.official&&<a href={tip.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div>)}</article>)}</div></section>}
      <footer><span>CUADERNO DE VIAJE · JAPÓN</span><span>Por Alfonso Pozuelo · Mayo de 2027</span><span>Portada: <a href="https://commons.wikimedia.org/wiki/File:FUS_-_Torii_gates_among_trees_at_Fushimi_Inari-taisha,_Kyoto,_Japan,_2015.jpg" target="_blank" rel="noreferrer">Josep M. Gracia</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a></span></footer>
    </main>
    <nav className="bottom-nav" aria-label="Navegación principal">{[['inicio','⌂','Inicio'],['ruta','↗','Ruta'],['dias','日','Días'],['preparar','✓','Preparar']].map(([id,icon,label])=><button key={id} className={`nav-link ${view===id?'selected':''}`} aria-current={view===id?'location':undefined} onClick={()=>navigate(id)}><span>{icon}</span>{label}</button>)}</nav>
  </>;
}

function RegularDay({day,saved,toggleVisit}:{day:Day;saved:Saved;toggleVisit:(id:string)=>void}){return <>
  {day.schedule.length>0&&<section className="content-block"><h4>El ritmo del día</h4><ol className="schedule-list">{day.schedule.map((step,index)=><li key={index}>{step}</li>)}</ol></section>}
  {!!day.guideSteps?.length&&<section className="content-block"><h4>Cómo hacer esta jornada</h4><div className="step-list">{day.guideSteps.map((step,index)=><StepView key={step.id} step={step} index={index}/>)}</div></section>}
  <section className="content-block"><h4>Transportes y billetes</h4>{day.transports.map(transport=><TransportView key={transport.id} transport={transport}/>)}</section>
  <section className="content-block"><h4>Lugares y visitas</h4>{day.places.map(place=><PlaceView key={place.id} dayId={day.id} place={place} done={!!saved.visits[`${day.id}:${place.id}`]} onToggle={()=>toggleVisit(`${day.id}:${place.id}`)}/>)}</section>
</>}

function DayThree({day,saved,toggleVisit}:{day:Day;saved:Saved;toggleVisit:(id:string)=>void}){
  const sharedSteps=day.guideSteps?.filter(step=>['osaka-to-tanabe','credential','tanabe-bus'].includes(step.id))||[];
  const walkSteps=day.guideSteps?.filter(step=>['trail-start','trail-return','dual-option'].includes(step.id))||[];
  const walkPlaces=day.places.filter(place=>['hosshinmon','mizunomi','fushiogami','haraido','hongu-heritage','hongu'].includes(place.id));
  const restPlaces=day.places.filter(place=>['hongu','oyunohara','kawayu','yunomine-tsuboyu'].includes(place.id));
  return <>
    <section className="content-block day3-shared"><p className="eyebrow">HASTA KAWAYU · TODOS JUNTOS</p><h4>El trayecto común</h4><p>Salís de Osaka, llegáis a Kii-Tanabe y tomáis el mismo Ryujin Bus hacia Hosshinmon-oji. A las 13:33, en Kawayu Onsen, se separan los dos grupos.</p><div className="step-list">{sharedSteps.map((step,index)=><StepView key={step.id} step={step} index={index}/>)}</div>{day.transports.filter(transport=>['kuroshio','kumano-bus'].includes(transport.id)).map(transport=><TransportView key={transport.id} transport={transport}/>)}{day.places.filter(place=>place.id==='tanabe-credential').map(place=><PlaceView key={place.id} dayId={day.id} place={place} done={!!saved.visits[`${day.id}:${place.id}`]} onToggle={()=>toggleVisit(`${day.id}:${place.id}`)}/>)}</section>
    <section className="day3-options" aria-label="Dos planes para el día 3">
      <article className="day3-plan"><p className="eyebrow">OPCIÓN A · GRUPO CAMINANTE</p><h4>Kumano Kodo a pie</h4><p className="plan-intro">Seguid en el mismo autobús hasta Hosshinmon-oji. Caminad unos 7–7,5 km hasta Hongu y regresad en autobús al hotel.</p>{day.transports.filter(transport=>transport.id==='kawayu-hosshinmon').map(transport=><TransportView key={transport.id} transport={transport}/>)}<div className="step-list">{walkSteps.map((step,index)=><StepView key={step.id} step={step} index={index}/>)}</div><h5>Camino y puntos de visita</h5>{walkPlaces.map(place=><PlaceView key={place.id} dayId={day.id} place={place} done={!!saved.visits[`${day.id}:${place.id}`]} onToggle={()=>toggleVisit(`${day.id}:${place.id}`)}/>)}</article>
      <article className="day3-plan day3-rest"><p className="eyebrow">OPCIÓN B · GRUPO QUE NO CAMINA</p><h4>Hongu y tiempo termal</h4><p className="plan-intro">Bajad en Kawayu Onsen a las 13:33 y caminad al Sansuikan. Dejad las mochilas según indique el hotel. Después elegid Hongu Taisha, Oyunohara o descanso en Kawayu; Yunomine y Tsuboyu solo si los autobuses del día dejan margen. No hace falta intentar todo.</p><a className="plan-map" href={directions('Kawayu Onsen bus stop','Sansuikan Kawayu Midoriya','walking')} target="_blank" rel="noreferrer">Parada Kawayu → hotel en Google Maps ↗</a><h5>Visitas que podéis elegir</h5>{restPlaces.map(place=><PlaceView key={place.id} dayId={day.id} place={place} done={!!saved.visits[`${day.id}:${place.id}`]} onToggle={()=>toggleVisit(`${day.id}:${place.id}`)}/>)}</article>
    </section>
    <aside className="day3-meet"><p className="eyebrow">REENCUENTRO · AMBOS GRUPOS</p><h4>Sansuikan Kawayu Midoriya</h4><p>{day.notes.find(note=>note.startsWith('Reunión de ambos grupos:'))||'Acordad una hora de encuentro en el hotel antes de separaros.'}</p><a href={trip.hotels.find(hotel=>hotel.id==='midoriya')?.map} target="_blank" rel="noreferrer">Hotel en Google Maps ↗</a></aside>
  </>;
}

function StepView({step,index}:{step:GuideStep;index:number}){return <article className="step"><div className="step-index">{String(index+1).padStart(2,'0')}</div><div className="step-body"><h4>{step.title.replace(/^\d+\s*·\s*/,'')}</h4><p>{step.detail}</p><div className="step-links">{step.map&&<a href={step.map} target="_blank" rel="noreferrer">Abrir trayecto ↗</a>}{step.official&&<a href={step.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div></div></article>}
function TransportView({transport}:{transport:Transport}){const coverage=transportGuide[transport.id];return <div className="transport-item"><b>{transport.title}</b><p>{transport.route}</p><p>{transport.detail}</p>{transport.duration&&<small>{transport.duration}</small>}{coverage&&<div className="coverage-detail"><strong>{coverage.badge}</strong><p>{coverage.explanation}</p>{coverage.action&&<p><b>Qué hacer:</b> {coverage.action}</p>}</div>}<div className="step-links">{transport.map&&<a href={transport.map} target="_blank" rel="noreferrer">Abrir ruta ↗</a>}{transport.booking&&<a href={transport.booking} target="_blank" rel="noreferrer">Billetes / fuente ↗</a>}{coverage?.url&&coverage.url!==transport.booking&&<a href={coverage.url} target="_blank" rel="noreferrer">Cobertura ↗</a>}</div></div>}
function PlaceView({place,dayId,done,onToggle}:{place:Place;dayId:string;done:boolean;onToggle:()=>void}){return <article className="place-item"><div><small>{place.duration||place.hours||'VISITA'}</small><h5>{place.name}</h5><p>{place.detail}</p>{place.practical&&<p>{place.practical}</p>}{place.price&&<p>Tarifa de referencia: {place.price}</p>}<div className="step-links"><a href={place.map||maps(place.name)} target="_blank" rel="noreferrer">Google Maps ↗</a>{place.official&&<a href={place.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div></div><button className={done?'visited':''} onClick={onToggle} aria-label={`${done?'Desmarcar':'Marcar'} ${place.name} como realizada`}>{done?'✓':'○'}</button><span hidden>{dayId}</span></article>}
function HotelCard({hotelId}:{hotelId:string}){const hotel=trip.hotels.find(item=>item.id===hotelId);if(!hotel)return null;return <section className="hotel-card"><small>ESTA NOCHE</small><h4>{hotel.name}</h4><p>{hotel.address}</p><p>{hotel.note}</p><a href={hotel.map} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></section>}
