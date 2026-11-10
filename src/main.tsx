import {useEffect,useMemo,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {defaultTrip} from './data/defaultTrip';
import {transportGuide} from './data/transportGuide';
import type {Day,Place} from './types';
import './styles.css';
import './product.css';

const trip=defaultTrip;
const maps=(name:string)=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
type Saved={tasks:Record<string,boolean>;visits:Record<string,boolean>;notes:Record<string,string>};
const storageKey='cuaderno-japon-producto-v1';
function readSaved():Saved{try{const raw=JSON.parse(localStorage.getItem(storageKey)||'{}');return {tasks:raw.tasks||{},visits:raw.visits||{},notes:raw.notes||{}};}catch{return {tasks:{},visits:{},notes:{}};}}
const keyDay=(d:Day)=>d.id;

function App(){
  const [active,setActive]=useState(0);
  const [saved,setSaved]=useState<Saved>(readSaved);
  const [view,setView]=useState('inicio');
  const day=trip.days[active];
  const hotel=trip.hotels.find(h=>h.id===day.hotelId);
  const tasks=trip.preparation||[];
  const completed=tasks.filter(t=>saved.tasks[t.id]).length;
  const tripStages=useMemo(()=>Array.from(new Set(trip.days.map(d=>d.city).filter(c=>c!=='Regreso'))),[]);
  useEffect(()=>{localStorage.setItem(storageKey,JSON.stringify(saved));},[saved]);
  const navigate=(target:string)=>{setView(target);requestAnimationFrame(()=>document.querySelector(`#${target}`)?.scrollIntoView({behavior:'smooth'}));};
  const chooseDay=(i:number)=>{setActive(i);setView('dias');};
  const toggleTask=(id:string)=>setSaved(s=>({...s,tasks:{...s.tasks,[id]:!s.tasks[id]}}));
  const toggleVisit=(id:string)=>setSaved(s=>({...s,visits:{...s.visits,[id]:!s.visits[id]}}));
  const setNote=(id:string,value:string)=>setSaved(s=>({...s,notes:{...s.notes,[id]:value}}));
  return <>
    <header className="topbar"><button className="brand brand-button" onClick={()=>navigate('inicio')}><span className="brand-mark">旅</span><span>CUADERNO <i>de viaje</i></span></button><span className="edition">GUÍA DE AUTOR <b>·</b> JAPÓN 2027</span><span className="edition author-tag">EDICIÓN DE PRUEBA</span></header>
    <main className="shell">
      <section className="hero" id="inicio"><div className="hero-image" style={{backgroundImage:`linear-gradient(180deg,transparent 70%,rgba(24,28,23,.45)),url('${trip.days[0].image}')`}} role="img" aria-label="Japón, inicio del viaje"/><div className="hero-copy"><p className="kicker"><span className="sun"/> 13 DÍAS POR JAPÓN <span className="kanji">日本 · 旅</span></p><h1>Japón,<br/><em>a nuestro ritmo.</em></h1><p className="hero-lede">De Osaka a Tokio, por Kumano, Kioto y Takayama. Una guía para disfrutar del camino y saber siempre cuál es el siguiente paso.</p><div className="author"><span className="author-avatar">旅</span><span><b>Un viaje de autor</b><small>Por <span className="placeholder">Tu nombre o marca</span> · Mayo de 2027</small></span></div><button className="primary" onClick={()=>navigate('dias')}>Abrir las jornadas <span>↓</span></button></div><div className="hero-caption"><span>JAPÓN · MAYO 2027</span><span>OSAKA → TOKIO</span></div></section>
      <section className="route-overview" id="ruta"><div className="section-head"><div><p className="eyebrow">LA RUTA EN UNA MIRADA</p><h2>Trece días.<br/><em>Un viaje completo.</em></h2></div><span className="route-stamp">日本<br/>旅</span></div><div className="route-line">{tripStages.map((city,i)=><div className="stage-piece" key={city}><div className="route-stop"><span>{String(i+1).padStart(2,'0')}</span><b>{city}</b></div>{i<tripStages.length-1&&<div className="route-connector"/>}</div>)}</div><div className="route-foot"><span>13 — 25 MAYO 2027</span><span>{trip.days.length} JORNADAS</span><button onClick={()=>navigate('estancias')}>VER ESTANCIAS ↗</button></div></section>
      <section className="day-section" id="dias"><div className="section-head day-head"><div><p className="eyebrow">EL CUADERNO ABIERTO</p><h2>Una jornada en <em>{day.city}.</em></h2></div><p className="section-note">Selecciona el día.<br/>Consulta el recorrido y cada detalle.</p></div><div className="day-layout"><div className="day-rail" role="tablist" aria-label="Jornadas del viaje">{trip.days.map((d,i)=><button key={d.id} className={`day-tab ${i===active?'active':''}`} role="tab" aria-selected={i===active} onClick={()=>chooseDay(i)}><span>{String(i+1).padStart(2,'0')}</span><small>{d.city}</small></button>)}</div><article className="day-panel"><div className="day-photo" style={{backgroundImage:`url('${day.image}')`}}><span>{day.date.toUpperCase()}</span><span>JORNADA {String(active+1).padStart(2,'0')}</span></div><div className="day-content"><p className="eyebrow">{day.city.toUpperCase()} · {day.date.toUpperCase()}</p><h3 className="product-day-title">{day.title}</h3><p className="day-summary">{day.summary}</p>{day.notes[0]&&<div className="author-tip"><b>DESDE EL CUADERNO</b><p>{day.notes[0]}</p></div>}
        {day.schedule.length>0&&<section className="content-block"><h4>El ritmo del día</h4><ol className="schedule-list">{day.schedule.map((s,i)=><li key={i}>{s}</li>)}</ol></section>}
        {!!day.guideSteps?.length&&<section className="content-block"><h4>Cómo hacer esta jornada</h4><div className="step-list">{day.guideSteps.map((s,i)=><article className="step" key={s.id}><div className="step-index">{String(i+1).padStart(2,'0')}</div><div className="step-body"><h4>{s.title.replace(/^\d+\s*·\s*/,'')}</h4><p>{s.detail}</p><div className="step-links">{s.map&&<a href={s.map} target="_blank" rel="noreferrer">Abrir trayecto ↗</a>}{s.official&&<a href={s.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div></div></article>)}</div></section>}
        <section className="content-block"><h4>Transportes y billetes</h4>{day.transports.map(t=><div className="transport-item" key={t.id}><b>{t.title}</b><p>{t.route}</p><p>{t.detail}</p>{t.duration&&<small>{t.duration}</small>}{transportGuide[t.id]&&<div className="coverage"><span className="coverage-dot"/>{transportGuide[t.id].badge}</div>}<div className="step-links">{t.map&&<a href={t.map} target="_blank" rel="noreferrer">Abrir ruta ↗</a>}{t.booking&&<a href={t.booking} target="_blank" rel="noreferrer">Billetes / fuente ↗</a>}</div></div>)}</section>
        <section className="content-block"><h4>Lugares y visitas</h4><div className="place-list">{day.places.map(p=><PlaceView key={p.id} dayId={day.id} place={p} done={!!saved.visits[`${day.id}:${p.id}`]} onToggle={()=>toggleVisit(`${day.id}:${p.id}`)}/>)}</div></section>
        {!!day.foodTips?.length&&<section className="content-block"><h4>Para comer, si apetece</h4>{day.foodTips.map(f=><div className="food-tip" key={f.id}><small>{f.style.toUpperCase()}</small><b>{f.title}</b><p>{f.detail}</p><a href={f.map} target="_blank" rel="noreferrer">Ver zona ↗</a></div>)}</section>}
        {!!day.notes.length&&<section className="content-block"><h4>Información práctica</h4>{day.notes.map((note,i)=><p className="practical-note" key={i}>{note}</p>)}</section>}
        {hotel&&<section className="hotel-card"><small>ESTA NOCHE</small><h4>{hotel.name}</h4><p>{hotel.address}</p><p>{hotel.note}</p><a href={hotel.map} target="_blank" rel="noreferrer">Abrir en Google Maps ↗</a></section>}
        <label className="personal-note">Tu nota para esta jornada<textarea value={saved.notes[keyDay(day)]||''} onChange={e=>setNote(keyDay(day),e.target.value)} placeholder="Una idea, una reserva o algo que quieras recordar…"/></label>
      </div></article></div></section>
      <section className="essentials" id="preparar"><div className="essential-intro"><p className="eyebrow">ANTES DE SALIR</p><h2>Las cosas importantes,<br/><em>resueltas a tiempo.</em></h2><p>Preparativos basados en el viaje real. Tus casillas se guardan en este dispositivo.</p><div className="progress-label"><span>{completed} de {tasks.length} preparativos listos</span><span>{Math.round(completed/tasks.length*100)}%</span></div><div className="progress-track"><span style={{width:`${Math.round(completed/tasks.length*100)}%`}}/></div></div><div className="task-list">{tasks.map(t=><label className={`task ${saved.tasks[t.id]?'done':''}`} key={t.id}><input type="checkbox" checked={!!saved.tasks[t.id]} onChange={()=>toggleTask(t.id)}/><span className="checkmark"/><span><b>{t.title}</b><small>{t.group} · {t.timing}</small><small>{t.detail}</small>{t.official&&<a href={t.official} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}>Fuente oficial ↗</a>}</span></label>)}</div></section>
      <section className="extra-section" id="estancias"><p className="eyebrow">DÓNDE DORMIR</p><h2>Estancias del viaje</h2><div className="hotel-grid">{trip.hotels.map(h=><article key={h.id}><small>{h.dates}</small><h3>{h.name}</h3><p>{h.address}</p><p>{h.note}</p><div className="step-links"><a href={h.map} target="_blank" rel="noreferrer">Google Maps ↗</a>{h.official&&<a href={h.official} target="_blank" rel="noreferrer">Web ↗</a>}</div></article>)}</div></section>
      {!!trip.manners?.length&&<section className="extra-section" id="costumbres"><p className="eyebrow">VIAJAR CON RESPETO</p><h2>Buenas prácticas</h2><div className="manners-grid">{trip.manners.map(g=><article key={g.id}><h3>{g.title}</h3>{g.tips.map(t=><div key={t.id}><b>{t.title}</b><p>{t.detail}</p>{t.official&&<a href={t.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div>)}</article>)}</div></section>}
      <footer><span>CUADERNO DE VIAJE · JAPÓN</span><span>Prototipo independiente con datos del itinerario.</span></footer>
    </main>
    <nav className="bottom-nav" aria-label="Navegación principal">{[['inicio','⌂','Inicio'],['dias','日','Días'],['ruta','↗','Ruta'],['preparar','✓','Preparar']].map(([id,icon,label])=><button key={id} className={`nav-link ${view===id?'selected':''}`} onClick={()=>navigate(id)}><span>{icon}</span>{label}</button>)}</nav>
  </>;
}

function PlaceView({place,dayId,done,onToggle}:{place:Place;dayId:string;done:boolean;onToggle:()=>void}){return <article className="place-item"><div><small>{place.duration||place.hours||'VISITA'}</small><h5>{place.name}</h5><p>{place.detail}</p>{place.practical&&<p>{place.practical}</p>}{place.price&&<p>Tarifa de referencia: {place.price}</p>}<div className="step-links"><a href={place.map||maps(place.name)} target="_blank" rel="noreferrer">Google Maps ↗</a>{place.official&&<a href={place.official} target="_blank" rel="noreferrer">Fuente ↗</a>}</div></div><button className={done?'visited':''} onClick={onToggle} aria-label={`${done?'Desmarcar':'Marcar'} ${place.name} como realizada`}>{done?'✓':'○'}</button><span hidden>{dayId}</span></article>}

createRoot(document.getElementById('root')!).render(<App/>);
