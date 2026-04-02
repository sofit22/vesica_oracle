import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════
   TAROT DECK — 18 cards × 3 meanings
   ═══════════════════════════════════════════ */
const TAROT_DECK = [
  { numeral:"0", name:"El Loco", emoji:"🌬️", keyword:"Salto de Fe", color:"#6b4c8a",
    meanings:[
      "El amor te pide que sueltes el control. Algo nuevo y emocionante espera si te animás a saltar sin calcular la caída. Confiá en lo que sentís.",
      "Estás al borde de algo hermoso, pero el miedo te frena. La locura no es saltar: es quedarte parada sabiendo que podés volar.",
      "El universo te empuja hacia lo desconocido en el amor. No necesitás un mapa, necesitás coraje. Lo que te espera no se parece a nada que hayas vivido."
    ]},
  { numeral:"I", name:"El Mago", emoji:"✨", keyword:"Manifestación", color:"#8a6b3d",
    meanings:[
      "Tenés todo lo que necesitás para crear el amor que deseás. Es momento de ser intencional: cada gesto pequeño es un acto de magia.",
      "Tu palabra tiene poder ahora. Lo que nombres, lo creás. Hablá de amor con la boca y con las manos: el universo está escuchando.",
      "Dejá de esperar que el amor aparezca: ya tenés todas las herramientas. Usá tu creatividad emocional. Sos más alquimista de lo que pensás."
    ]},
  { numeral:"II", name:"La Sacerdotisa", emoji:"🌙", keyword:"Intuición", color:"#3d5a8a",
    meanings:[
      "Tu intuición sabe cosas que tu mente todavía no procesó. Hacé silencio interior y escuchá lo que tu cuerpo te dice sobre esta persona o situación.",
      "Hay algo debajo de la superficie que solo vos podés percibir. No busques respuestas afuera: tu cuerpo ya las tiene. Sentí antes de pensar.",
      "El amor más profundo empieza en el misterio. No necesitás entender todo ahora. Confiá en esa parte tuya que sabe sin explicar."
    ]},
  { numeral:"III", name:"La Emperatriz", emoji:"🌺", keyword:"Abundancia", color:"#6b8a3d",
    meanings:[
      "El amor florece a tu alrededor. Es tiempo de nutrirte, de recibir sin culpa, de dejarte querer. La abundancia emocional empieza por vos.",
      "Tu cuerpo es un jardín. ¿Lo estás cuidando o lo estás exigiendo? El amor que buscás afuera empieza con cómo te tratás a vos misma.",
      "Algo fértil crece en tu vida amorosa. No lo apures: las cosas más hermosas necesitan su estación. Mientras tanto, disfrutá de estar viva."
    ]},
  { numeral:"IV", name:"El Emperador", emoji:"🏛️", keyword:"Estructura", color:"#8a5a3d",
    meanings:[
      "El amor necesita bases firmes. Revisá si estás construyendo sobre terreno sólido o sobre promesas vacías. La estabilidad no es aburrimiento, es cuidado.",
      "Poner límites es un acto de amor, no de crueldad. Lo que protegés con firmeza, crece más fuerte. Aprendé a decir que no para poder decir que sí de verdad.",
      "¿Estás sosteniendo todo sola? El amor también necesita estructura compartida. Pedí lo que necesitás sin sentir que estás pidiendo demasiado."
    ]},
  { numeral:"V", name:"El Hierofante", emoji:"🔑", keyword:"Tradición", color:"#7a6b5a",
    meanings:[
      "¿Estás siguiendo tu propio camino en el amor o repitiendo patrones aprendidos? A veces la respuesta está en cuestionar lo que siempre diste por sentado.",
      "Hay una creencia vieja sobre el amor que ya no te sirve. Identificala, agradecela, y soltala. Tu forma de amar no tiene por qué parecerse a la de nadie.",
      "Alguien te enseñó que el amor duele. Pero, ¿y si el amor verdadero simplemente fluye? Reescribí las reglas que heredaste."
    ]},
  { numeral:"VI", name:"Los Enamorados", emoji:"💞", keyword:"Elección", color:"#8a3d5a",
    meanings:[
      "Una decisión del corazón te espera. No se trata de perfección sino de autenticidad. Elegí lo que te haga sentir más vos, no lo que se vea bien desde afuera.",
      "Dos caminos se abren. Ninguno es el incorrecto, pero solo uno resuena con quien estás siendo ahora. Escuchá tu cuerpo: él ya eligió.",
      "El amor verdadero no te pide que elijas entre vos y la otra persona. Si sentís que te perdés al elegir, quizás el dilema es otro."
    ]},
  { numeral:"VII", name:"El Carro", emoji:"🔥", keyword:"Determinación", color:"#8a3d3d",
    meanings:[
      "Avanzás con fuerza hacia lo que querés. El amor requiere coraje y dirección. No tengas miedo de ir a buscar lo que sentís que te corresponde.",
      "Algo se mueve rápido en tu vida emocional. No frenes: esta energía es tuya. Usala para avanzar hacia lo que tu corazón necesita.",
      "El amor no siempre viene caminando despacio. A veces llega como una tormenta. Preparate para moverte, para actuar, para decidir en caliente."
    ]},
  { numeral:"VIII", name:"La Fuerza", emoji:"🦁", keyword:"Paciencia", color:"#a87c3d",
    meanings:[
      "La verdadera fuerza en el amor es la ternura, no la presión. Domesticá tus impulsos con dulzura. Lo que tiene que florecer, florece a su tiempo.",
      "Ser fuerte no es aguantar: es poder ser vulnerable sin romperte. Mostrá tu corazón aunque tiemble. Eso es valentía.",
      "Hay una parte salvaje tuya que pide ser amada tal como es. No la domestiques para encajar: encontrá a quien sepa admirar tu fuego."
    ]},
  { numeral:"IX", name:"El Ermitaño", emoji:"🏔️", keyword:"Introspección", color:"#5a6b7a",
    meanings:[
      "Este es tu momento de soledad fértil. No huyas del silencio: adentro tuyo hay respuestas que solo aparecen cuando dejás de buscar afuera.",
      "Estar sola no es estar vacía. Ahora mismo tu compañía más valiosa sos vos. Usá esta pausa para reconectarte con lo que realmente querés.",
      "El amor propio a veces se parece a un retiro: silencioso, hondo, un poco incómodo. Pero de acá salís sabiendo exactamente qué necesitás."
    ]},
  { numeral:"X", name:"La Rueda", emoji:"🎡", keyword:"Ciclos", color:"#6b5a8a",
    meanings:[
      "Los ciclos del amor giran. Lo que ahora parece estancado está por moverse. Confiá en que esta fase es parte del viaje, no el final.",
      "Algo termina para que algo nuevo empiece. No te aferres a la versión vieja de tu historia. La rueda gira y te lleva a donde necesitás ir.",
      "El amor tiene estaciones. Si estás en invierno, no significa que el calor no exista. Significa que algo se prepara bajo la superficie."
    ]},
  { numeral:"XI", name:"La Justicia", emoji:"⚖️", keyword:"Equilibrio", color:"#5a7a6b",
    meanings:[
      "El amor te pide honestidad radical. ¿Estás dando lo mismo que pedís? El equilibrio empieza por mirarte al espejo con compasión y verdad.",
      "Algo necesita ajustarse. Quizás diste demasiado, quizás pediste poco. Este es el momento de recalibrar tus relaciones con sinceridad.",
      "La justicia del corazón no se trata de venganza ni de cuentas. Se trata de verdad. ¿Podés ser completamente honesta con vos misma?"
    ]},
  { numeral:"XIV", name:"La Templanza", emoji:"🌊", keyword:"Armonía", color:"#3d7a8a",
    meanings:[
      "Algo se está integrando dentro tuyo. Dos energías que parecían opuestas empiezan a fluir juntas. El amor llega cuando dejás de forzar.",
      "No todo tiene que ser intenso para ser real. A veces el amor más profundo es el que fluye sin drama, como agua entre piedras.",
      "Estás aprendiendo a mezclar lo que querés con lo que necesitás. Esa alquimia interna se refleja afuera. El equilibrio te vuelve magnética."
    ]},
  { numeral:"XVII", name:"La Estrella", emoji:"⭐", keyword:"Esperanza", color:"#4a6b9a",
    meanings:[
      "Después de la tormenta, la calma. El universo te recuerda que el amor genuino existe y está más cerca de lo que pensás. No pierdas la fe.",
      "Hay una luz que no se apaga, incluso en tus noches más oscuras. Esa luz es tu capacidad de amar. Seguila: te va a guiar.",
      "Algo hermoso se alinea en tu cielo emocional. No lo fuerces, no lo analices: solo dejate sentir la esperanza. Ya es suficiente."
    ]},
  { numeral:"XVIII", name:"La Luna", emoji:"🌑", keyword:"Misterio", color:"#3d3d6b",
    meanings:[
      "No todo es lo que parece. Hay emociones ocultas —tuyas o de alguien más— que necesitan salir a la luz. Navegá la incertidumbre sin perder tu centro.",
      "Los miedos nocturnos no son la verdad. Son ecos de heridas viejas. Distinguí entre lo que sentís ahora y lo que arrastrás de antes.",
      "El amor tiene una zona oscura que da miedo explorar. Pero ahí, en lo que no querés ver, está la clave para entender qué necesitás realmente."
    ]},
  { numeral:"XIX", name:"El Sol", emoji:"☀️", keyword:"Alegría", color:"#a89030",
    meanings:[
      "Luz plena sobre tu vida amorosa. Es momento de disfrutar, de reírte, de sentir sin culpa. El amor también puede ser simple y luminoso.",
      "Merecés un amor que te haga sonreír sin esfuerzo. Si ahora mismo sentís esa calidez, quedate ahí. Si no, buscala: existe y te espera.",
      "El sol no pide permiso para salir. Tu alegría tampoco debería. Dejá de justificarte por ser feliz. Brillá como te salga."
    ]},
  { numeral:"XXI", name:"El Mundo", emoji:"🌍", keyword:"Plenitud", color:"#5a8a6b",
    meanings:[
      "Un ciclo se completa. Llegaste a un lugar de entendimiento profundo sobre lo que el amor significa para vos. Celebrá lo recorrido antes de empezar de nuevo.",
      "Todo lo que viviste en el amor te trajo acá. No fue en vano: cada lágrima, cada risa, cada silencio. Sos la versión más completa de vos misma.",
      "El mundo entero cabe en un abrazo honesto. Sentí la plenitud de este momento. No hace falta más: lo que tenés adentro ya es suficiente."
    ]},
  { numeral:"—", name:"As de Copas", emoji:"🏆", keyword:"Nuevo Amor", color:"#8a3d6b",
    meanings:[
      "Una nueva emoción está naciendo. Puede ser una persona, un sentimiento renovado, o un amor propio que por fin se desborda. Abrí las manos para recibir.",
      "El universo te ofrece una copa llena. No preguntes si la merecés: tomala. Este es el inicio de algo que no tiene nombre todavía, pero late fuerte.",
      "Hay un amor fresco esperándote. No lo busques donde siempre: esta vez viene de un lugar inesperado. Mantené los ojos y el corazón abiertos."
    ]}
];

/* ═══════════════════════════════════════════
   AUDIO ENGINE
   ═══════════════════════════════════════════ */
let audioCtx = null;
const initAudio = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window['webkitAudioContext'])();
  return audioCtx.state === "suspended" ? audioCtx.resume() : Promise.resolve();
};
const playKeyClick = () => {
  if (!audioCtx) return; const now = audioCtx.currentTime;
  const len = Math.floor(audioCtx.sampleRate * 0.012);
  const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random()*2-1)*Math.pow(1-i/len,8);
  const src = audioCtx.createBufferSource(); src.buffer = buf;
  const bp = audioCtx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.value=3500+Math.random()*1500; bp.Q.value=2.5;
  const g1 = audioCtx.createGain(); g1.gain.setValueAtTime(0.22,now); g1.gain.exponentialRampToValueAtTime(0.001,now+0.025);
  src.connect(bp); bp.connect(g1); g1.connect(audioCtx.destination); src.start(now); src.stop(now+0.03);
  const osc = audioCtx.createOscillator(); osc.type="sine"; osc.frequency.setValueAtTime(280+Math.random()*80,now);
  osc.frequency.exponentialRampToValueAtTime(120,now+0.06);
  const g2 = audioCtx.createGain(); g2.gain.setValueAtTime(0.12,now); g2.gain.exponentialRampToValueAtTime(0.001,now+0.06);
  osc.connect(g2); g2.connect(audioCtx.destination); osc.start(now); osc.stop(now+0.07);
  const ping = audioCtx.createOscillator(); ping.type="sine"; ping.frequency.setValueAtTime(4200+Math.random()*800,now);
  const g3 = audioCtx.createGain(); g3.gain.setValueAtTime(0.03,now); g3.gain.exponentialRampToValueAtTime(0.001,now+0.04);
  ping.connect(g3); g3.connect(audioCtx.destination); ping.start(now); ping.stop(now+0.05);
};
const playFlipSound = () => {
  if (!audioCtx) return; const now = audioCtx.currentTime;
  [523.25,659.25,783.99].forEach((f,i) => {
    const o = audioCtx.createOscillator(); o.type="sine"; o.frequency.value=f;
    const fl = audioCtx.createBiquadFilter(); fl.type="lowpass"; fl.frequency.value=3000;
    const g = audioCtx.createGain(); g.gain.setValueAtTime(0,now+i*0.08);
    g.gain.linearRampToValueAtTime(0.06,now+i*0.08+0.05);
    g.gain.exponentialRampToValueAtTime(0.001,now+0.8);
    o.connect(fl); fl.connect(g); g.connect(audioCtx.destination); o.start(now+i*0.08); o.stop(now+1);
  });
};

/* ═══════════════════════════════════════════
   SVG CARD BACK
   ═══════════════════════════════════════════ */
const CardBackSVG = () => (
  <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",display:"block"}}>
    <defs>
      <radialGradient id="bgG" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#1a1015"/><stop offset="100%" stopColor="#0a0608"/>
      </radialGradient>
      <linearGradient id="gL" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8a7433" stopOpacity="0.2"/>
        <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#8a7433" stopOpacity="0.2"/>
      </linearGradient>
      <linearGradient id="rL" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#6b1d2a" stopOpacity="0"/>
        <stop offset="50%" stopColor="#8a2a3a" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#6b1d2a" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="200" height="320" rx="10" fill="url(#bgG)"/>
    <rect x="8" y="8" width="184" height="304" rx="7" fill="none" stroke="#8a7433" strokeWidth="0.5" opacity="0.4"/>
    <rect x="14" y="14" width="172" height="292" rx="5" fill="none" stroke="#8a7433" strokeWidth="0.3" opacity="0.25"/>
    <g transform="translate(100,150)" opacity="0.5">
      <circle r="65" fill="none" stroke="url(#gL)" strokeWidth="0.6"/>
      <circle r="55" fill="none" stroke="#8a7433" strokeWidth="0.3" opacity="0.4"/>
      <circle r="45" fill="none" stroke="#8a7433" strokeWidth="0.3" opacity="0.3"/>
      <circle cx="-18" r="32" fill="none" stroke="url(#gL)" strokeWidth="0.5"/>
      <circle cx="18" r="32" fill="none" stroke="url(#gL)" strokeWidth="0.5"/>
      <polygon points="0,-42 36.4,21 -36.4,21" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.35"/>
      <polygon points="0,42 36.4,-21 -36.4,-21" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.35"/>
      {[0,60,120,180,240,300].map(a=>(
        <circle key={a} cx={Math.cos(a*Math.PI/180)*18} cy={Math.sin(a*Math.PI/180)*18} r="18" fill="none" stroke="#c9a84c" strokeWidth="0.35" opacity="0.3"/>
      ))}
      <circle r="3" fill="#c9a84c" opacity="0.4"/>
      <circle r="1.2" fill="#e8c55a" opacity="0.6"/>
    </g>
    {[[24,24],[176,24],[24,296],[176,296]].map(([x,y],i)=>(
      <g key={i} transform={`translate(${x},${y})`} opacity="0.35">
        <line x1="-6" y1="0" x2="6" y2="0" stroke="#c9a84c" strokeWidth="0.5"/>
        <line x1="0" y1="-6" x2="0" y2="6" stroke="#c9a84c" strokeWidth="0.5"/>
        <circle r="2" fill="none" stroke="#c9a84c" strokeWidth="0.4"/>
      </g>
    ))}
    <line x1="40" y1="40" x2="160" y2="40" stroke="url(#rL)" strokeWidth="0.5"/>
    <line x1="40" y1="280" x2="160" y2="280" stroke="url(#rL)" strokeWidth="0.5"/>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(
      <line key={a} x1={100+Math.cos(a*Math.PI/180)*20} y1={150+Math.sin(a*Math.PI/180)*20}
        x2={100+Math.cos(a*Math.PI/180)*68} y2={150+Math.sin(a*Math.PI/180)*68}
        stroke="#c9a84c" strokeWidth="0.2" opacity="0.2"/>
    ))}
    <text x="100" y="62" textAnchor="middle" fontSize="10" fill="#c9a84c" opacity="0.4" fontFamily="serif">✦</text>
    <text x="100" y="250" textAnchor="middle" fontSize="10" fill="#c9a84c" opacity="0.4" fontFamily="serif">✦</text>
  </svg>
);

/* ═══════════════════════════════════════════
   ILLUSTRATION PLACEHOLDER
   ═══════════════════════════════════════════ */
const IllustrationPlaceholder = ({card}) => (
  <div style={{
    width:"100%",height:"100%",
    background:`linear-gradient(160deg, ${card.color}15 0%, #0a060800 40%, ${card.color}10 100%)`,
    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
    position:"relative",overflow:"hidden",
  }}>
    <div style={{
      position:"absolute",inset:0,opacity:0.04,
      backgroundImage:`linear-gradient(${card.color}40 1px, transparent 1px), linear-gradient(90deg, ${card.color}40 1px, transparent 1px)`,
      backgroundSize:"40px 40px",
    }}/>
    <div style={{fontSize:72,marginBottom:16,filter:"saturate(0.8)"}}>{card.emoji}</div>
    <div style={{
      fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:4,
      textTransform:"uppercase",color:"#8a7433",opacity:0.5,
    }}>tu ilustración acá</div>
    {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos,i)=>(
      <div key={i} style={{
        position:"absolute",...pos,width:16,height:16,
        borderTop:i<2?"1px solid rgba(201,168,76,0.15)":"none",
        borderBottom:i>=2?"1px solid rgba(201,168,76,0.15)":"none",
        borderLeft:i%2===0?"1px solid rgba(201,168,76,0.15)":"none",
        borderRight:i%2===1?"1px solid rgba(201,168,76,0.15)":"none",
      }}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   STAR BURST
   ═══════════════════════════════════════════ */
const STARS = ["✨","⭐","🌟","💫"];
const StarBurst = ({trigger}) => {
  const [particles,setParticles] = useState([]);
  useEffect(()=>{
    if(!trigger) return;
    const id=setTimeout(()=>{
      setParticles(Array.from({length:18},(_,i)=>{
        const a=Math.random()*Math.PI*2, v=70+Math.random()*120;
        return {id:i, emoji:STARS[Math.floor(Math.random()*STARS.length)],
          tx:Math.cos(a)*v, ty:Math.sin(a)*v,
          rot:Math.random()*720-360, dur:0.5+Math.random()*0.6,
          scale:0.5+Math.random()*0.8};
      }));
    },0);
    const t=setTimeout(()=>setParticles([]),1300);
    return ()=>{clearTimeout(id);clearTimeout(t);};
  },[trigger]);
  if(!particles.length) return null;
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:2000,
      display:"flex",alignItems:"center",justifyContent:"center"}}>
      {particles.map(p=>(
        <span key={p.id} style={{
          position:"absolute",fontSize:`${16*p.scale}px`,
          animation:`starBurst ${p.dur}s cubic-bezier(0.25,0.46,0.45,0.94) forwards`,
          "--tx":`${p.tx}px`,"--ty":`${p.ty}px`,"--rot":`${p.rot}deg`,
        }}>{p.emoji}</span>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   EXPANDED OVERLAY
   ═══════════════════════════════════════════ */
const ExpandedCard = ({card, meaning, onClose, show}) => {
  useEffect(()=>{
    const root = document.documentElement;
    if(show) root.style.overflow="hidden"; else root.style.overflow="";
    return ()=>{root.style.overflow=""};
  },[show]);

  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:1000,
      background:"rgba(5,3,4,0.9)",backdropFilter:"blur(14px)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:20,
      opacity:show?1:0,pointerEvents:show?"auto":"none",
      transition:"opacity 0.5s ease",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        display:"flex",maxWidth:840,width:"100%",maxHeight:"88vh",
        borderRadius:16,overflow:"hidden",
        border:"1px solid rgba(201,168,76,0.2)",
        boxShadow:`0 0 80px ${card.color}18, 0 20px 60px rgba(0,0,0,0.5)`,
        transform:show?"scale(1) translateY(0)":"scale(0.92) translateY(20px)",
        transition:"transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {/* LEFT — Illustration */}
        <div className="overlay-illustration" style={{
          flex:"0 0 46%",minHeight:400,background:"#0d090b",
          borderRight:"1px solid rgba(201,168,76,0.1)",
        }}>
          <IllustrationPlaceholder card={card}/>
        </div>

        {/* RIGHT — Meaning */}
        <div className="overlay-meaning" style={{
          flex:1,background:"#0d090b",padding:"44px 40px",
          display:"flex",flexDirection:"column",justifyContent:"center",
          position:"relative",overflowY:"auto",
        }}>
          <button onClick={onClose} style={{
            position:"absolute",top:16,right:20,background:"none",border:"none",
            cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:3,
            color:"#8a7433",textTransform:"uppercase",opacity:0.5,
            transition:"opacity 0.3s",
          }}
          onMouseEnter={e=>e.target.style.opacity=1}
          onMouseLeave={e=>e.target.style.opacity=0.5}
          >cerrar ✕</button>

          <div style={{
            fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:5,
            color:"#8a7433",textTransform:"uppercase",marginBottom:10,
          }}>{card.numeral}</div>

          <h2 style={{
            fontFamily:"'Cinzel Decorative',serif",
            fontSize:"clamp(24px,3.5vw,36px)",fontWeight:400,
            color:"#c9a84c",margin:"0 0 6px 0",lineHeight:1.2,
          }}>{card.name}</h2>

          <div style={{
            fontFamily:"'Cinzel',serif",fontSize:11,letterSpacing:4,
            textTransform:"uppercase",color:"#d4707a",marginBottom:28,
          }}>{card.keyword}</div>

          <div style={{
            width:40,height:1,marginBottom:28,
            background:`linear-gradient(90deg, ${card.color}, transparent)`,
          }}/>

          <p style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(16px,2vw,20px)",fontWeight:300,
            lineHeight:1.8,color:"#c8bca8",fontStyle:"italic",margin:0,
          }}>{meaning}</p>

          <div style={{
            marginTop:36,fontSize:12,letterSpacing:6,
            color:"#8a7433",opacity:0.4,textAlign:"center",
          }}>✦ ✦ ✦</div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   GRID CARD
   ═══════════════════════════════════════════ */
const TarotCard = ({card, delay, visible, onSelect}) => {
  const hoverOk = useRef(true);
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{
      perspective:1200,
      opacity:visible?1:0,
      transform:visible?"translateY(0)":"translateY(30px)",
      transition:`opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }}>
      <div
        onClick={()=>{ initAudio().then(()=>{ playFlipSound(); onSelect(card); }); }}
        onMouseEnter={()=>{
          setHovered(true);
          if(hoverOk.current){ hoverOk.current=false; initAudio().then(()=>playKeyClick()); setTimeout(()=>{hoverOk.current=true},120); }
        }}
        onMouseLeave={()=>setHovered(false)}
        style={{
          position:"relative",width:"100%",aspectRatio:"2/3.2",
          cursor:"pointer",borderRadius:12,overflow:"hidden",
          border:`1px solid ${hovered?"#c9a84c":"#8a7433"}`,
          boxShadow:hovered
            ?"0 12px 40px rgba(201,168,76,0.15), inset 0 0 60px rgba(107,29,42,0.15)"
            :"0 4px 30px rgba(0,0,0,0.5), inset 0 0 60px rgba(107,29,42,0.1)",
          transform:hovered?"translateY(-8px) scale(1.03)":"translateY(0) scale(1)",
          transition:"transform 0.35s ease, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        <CardBackSVG/>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function TarotApp() {
  const [activeCards, setActiveCards] = useState(()=>[...TAROT_DECK].sort(()=>Math.random()-0.5).slice(0,6));
  const [visible, setVisible] = useState(true);
  const [stars] = useState(()=>Array.from({length:70},(_,i)=>({
    id:i, left:Math.random()*100, top:Math.random()*100,
    dur:2+Math.random()*4, maxOp:0.2+Math.random()*0.5,
    delay:Math.random()*3, size:Math.random()>0.7?3:2,
  })));
  const [selected, setSelected] = useState(null);
  const [meaning, setMeaning] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const drawCards = useCallback(()=>{
    setActiveCards([...TAROT_DECK].sort(()=>Math.random()-0.5).slice(0,6));
    setVisible(false);
    requestAnimationFrame(()=>requestAnimationFrame(()=>setVisible(true)));
  },[]);

  const handleSelect = (card)=>{
    const m = card.meanings[Math.floor(Math.random()*card.meanings.length)];
    setSelected(card); setMeaning(m); setBurstKey(k=>k+1);
    setTimeout(()=>setShowOverlay(true),150);
  };
  const handleClose = ()=>{
    setShowOverlay(false);
    setTimeout(()=>setSelected(null),500);
  };
  const handleReset = ()=>{
    initAudio().then(()=>{ for(let i=0;i<5;i++) setTimeout(()=>playKeyClick(),i*55); });
    setVisible(false);
    setTimeout(()=>drawCards(),500);
  };

  return (
    <div style={{
      minHeight:"100vh",background:"#0a0608",color:"#e8dcc8",
      fontFamily:"'Cormorant Garamond',serif",position:"relative",overflow:"hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&display=swap" rel="stylesheet"/>

      <style>{`
        @keyframes twinkle { 0%{opacity:0.05;transform:scale(0.8)} 100%{opacity:var(--max-op);transform:scale(1.3)} }
        @keyframes starBurst { 0%{opacity:1;transform:translate(0,0) rotate(0deg) scale(1)} 100%{opacity:0;transform:translate(var(--tx),var(--ty)) rotate(var(--rot)) scale(0.2)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @media(max-width:700px){
          .overlay-illustration{flex:0 0 220px !important;min-height:220px !important;border-right:none !important;border-bottom:1px solid rgba(201,168,76,0.1) !important;}
          div[style*="display: flex"][style*="max-width: 840"]{flex-direction:column !important;max-height:92vh !important;}
          .overlay-meaning{padding:28px 24px !important;}
        }
        @media(max-width:560px){
          div[style*="grid-template-columns: repeat(3"]{grid-template-columns:repeat(2,1fr) !important;gap:18px !important;}
        }
      `}</style>

      {/* Stars */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {stars.map(s=>(
          <div key={s.id} style={{
            position:"absolute",left:`${s.left}%`,top:`${s.top}%`,
            width:s.size,height:s.size,background:"#8a7433",borderRadius:"50%",
            animation:`twinkle ${s.dur}s ease-in-out infinite alternate`,
            animationDelay:`${s.delay}s`,"--max-op":s.maxOp,
          }}/>
        ))}
      </div>

      <div style={{
        position:"fixed",top:"30%",left:"50%",transform:"translate(-50%,-50%)",
        width:800,height:600,
        background:"radial-gradient(ellipse,rgba(107,29,42,0.15) 0%,transparent 70%)",
        pointerEvents:"none",zIndex:0,
      }}/>

      <div style={{
        position:"fixed",inset:0,pointerEvents:"none",zIndex:9999,opacity:0.03,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}/>

      {/* Content */}
      <div style={{
        position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",
        padding:"48px 20px 60px",textAlign:"center",
      }}>
        <div style={{marginBottom:50,animation:"fadeUp 1.2s ease forwards"}}>
          <div style={{
            fontFamily:"'Cinzel Decorative',serif",fontSize:14,
            letterSpacing:8,textTransform:"uppercase",color:"#8a7433",marginBottom:16,
          }}>✦ oráculo ✦</div>
          <h1 style={{
            fontFamily:"'Cinzel Decorative',serif",
            fontSize:"clamp(32px,6vw,56px)",fontWeight:400,
            color:"#e8dcc8",letterSpacing:4,lineHeight:1.2,
            textShadow:"0 0 40px rgba(201,168,76,0.15)",margin:0,
          }}>
            Tarot{" "}
            <span style={{color:"#c9a84c",fontStyle:"italic",
              fontFamily:"'Cormorant Garamond',serif",fontWeight:300,
            }}>del Amor</span>
          </h1>
          <p style={{
            fontSize:18,fontWeight:300,color:"#a89a82",
            marginTop:16,fontStyle:"italic",letterSpacing:1,
          }}>Elegí una carta y descubrí qué tiene el universo para decirte</p>
          <div style={{
            width:60,height:1,margin:"20px auto 0",
            background:"linear-gradient(90deg,transparent,#8a7433,transparent)",
          }}/>
        </div>

        <p style={{
          fontSize:15,color:"#8a4a50",letterSpacing:3,
          textTransform:"uppercase",fontFamily:"'Cinzel',serif",
          marginBottom:40,animation:"fadeUp 1.2s ease 0.3s both",
        }}>Elegí una carta</p>

        <div style={{
          display:"grid",gridTemplateColumns:"repeat(3,1fr)",
          gap:28,maxWidth:780,margin:"0 auto",
        }}>
          {activeCards.map((card,i)=>(
            <TarotCard key={card.name+"-"+i} card={card}
              delay={0.1+i*0.12} visible={visible} onSelect={handleSelect}/>
          ))}
        </div>

        <div style={{marginTop:50,animation:"fadeUp 1s ease 1.5s both"}}>
          <button onClick={handleReset} style={{
            background:"none",border:"1px solid #8a7433",color:"#8a7433",
            fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:4,
            textTransform:"uppercase",padding:"14px 36px",cursor:"pointer",
            borderRadius:2,transition:"all 0.4s ease",
          }}
          onMouseEnter={e=>{e.target.style.borderColor="#c9a84c";e.target.style.color="#c9a84c";
            e.target.style.boxShadow="0 0 20px rgba(201,168,76,0.15)";e.target.style.background="rgba(201,168,76,0.05)";}}
          onMouseLeave={e=>{e.target.style.borderColor="#8a7433";e.target.style.color="#8a7433";
            e.target.style.boxShadow="none";e.target.style.background="none";}}
          >✦&ensp;Nueva tirada&ensp;✦</button>
        </div>

        <p style={{
          marginTop:60,fontSize:13,color:"rgba(168,154,130,0.4)",
          fontStyle:"italic",letterSpacing:1,animation:"fadeUp 1s ease 1.8s both",
        }}>Las cartas reflejan energías, no destinos. Tu corazón siempre elige.</p>
      </div>

      {/* Star burst */}
      <StarBurst trigger={burstKey}/>

      {/* Overlay */}
      {selected && <ExpandedCard card={selected} meaning={meaning} onClose={handleClose} show={showOverlay}/>}
    </div>
  );
}
