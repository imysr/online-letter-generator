"use client";

import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  recipient: string;
  sender: string;
  headline: string;
  message: string;
  photos: string[];
  flower: string;
  occasion: string;
  theme: string;
};

const bouquetLayout = [
  { x: 0, y: 48, rotate: -32, scale: .78 },
  { x: 0, y: 8, rotate: -22, scale: .95 },
  { x: 0, y: 35, rotate: -12, scale: .86 },
  { x: 0, y: -5, rotate: 0, scale: 1.08 },
  { x: 0, y: 32, rotate: 12, scale: .88 },
  { x: 0, y: 5, rotate: 22, scale: .96 },
  { x: 0, y: 50, rotate: 32, scale: .76 },
];

function FlowerBloom({ type, index }: { type: string; index: number }) {
  const kind = type === "wildflower" ? ["daisy", "rose", "daisy", "rose"][index % 4] : type;
  const petalId = `petal-${kind}-${index}`;
  const centreId = `centre-${kind}-${index}`;

  return <svg className={`flower-art flower-art-${kind}`} viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <radialGradient id={petalId} cx="35%" cy="28%" r="72%">
        <stop offset="0" stopColor={kind === "sunflower" ? "#fff3a8" : kind === "tulip" ? "#ffb4c5" : kind === "daisy" ? "#fffdf4" : "#ff91a8"}/>
        <stop offset=".58" stopColor={kind === "sunflower" ? "#f6bd32" : kind === "tulip" ? "#e95278" : kind === "daisy" ? "#f2e5e8" : "#d93f64"}/>
        <stop offset="1" stopColor={kind === "sunflower" ? "#ce7f1f" : "#922644"}/>
      </radialGradient>
      <radialGradient id={centreId}><stop stopColor="#d99648"/><stop offset="1" stopColor="#573522"/></radialGradient>
    </defs>
    {kind === "rose" && <g>
      <circle cx="50" cy="50" r="34" fill={`url(#${petalId})`} opacity=".95"/>
      <ellipse cx="36" cy="44" rx="23" ry="30" fill="#f06c88" transform="rotate(-38 36 44)"/>
      <ellipse cx="64" cy="44" rx="23" ry="30" fill="#c9365c" transform="rotate(38 64 44)"/>
      <ellipse cx="50" cy="61" rx="27" ry="22" fill="#b62f53"/>
      <ellipse cx="50" cy="43" rx="18" ry="23" fill="#f47a94"/>
      <path d="M35 51c8-20 32-22 36-3 3 15-14 27-25 18-8-7-2-18 8-17 8 1 9 10 3 14" fill="none" stroke="#8f2344" strokeWidth="5" strokeLinecap="round"/>
      <path d="M26 66c15 15 42 16 52-4" fill="none" stroke="#ff9db0" strokeWidth="4" strokeLinecap="round" opacity=".65"/>
    </g>}
    {kind === "tulip" && <g>
      <path d="M18 27c14 3 23 10 32 25 9-15 18-22 32-25 1 32-8 55-32 59C26 82 17 59 18 27Z" fill={`url(#${petalId})`}/>
      <path d="M28 24c14 5 20 13 22 28 3-16 10-25 23-32 1 27-3 47-23 58-18-9-24-28-22-54Z" fill="#ef6282" opacity=".9"/>
      <path d="M50 17c10 13 13 27 0 57-13-27-10-43 0-57Z" fill="#ff9bb0" opacity=".88"/>
      <path d="M23 43c9 28 43 41 57 3" fill="none" stroke="#a92c50" strokeWidth="3" opacity=".5"/>
    </g>}
    {kind === "sunflower" && <g>{Array.from({length:16}).map((_,petal)=><ellipse key={petal} cx="50" cy="18" rx="10" ry="25" fill={`url(#${petalId})`} transform={`rotate(${petal*22.5} 50 50)`}/>)}<circle cx="50" cy="50" r="24" fill={`url(#${centreId})`}/><circle cx="50" cy="50" r="17" fill="none" stroke="#f2bb55" strokeWidth="3" strokeDasharray="2 4"/></g>}
    {kind === "daisy" && <g>{Array.from({length:12}).map((_,petal)=><ellipse key={petal} cx="50" cy="19" rx="11" ry="25" fill={`url(#${petalId})`} transform={`rotate(${petal*30} 50 50)`}/>)}<circle cx="50" cy="50" r="19" fill="#e4a83e"/><circle cx="50" cy="50" r="13" fill="none" stroke="#8c5a2d" strokeWidth="3" strokeDasharray="2 3"/></g>}
  </svg>;
}

export default function LetterPreviewExperience(props: Props) {
  const [chapter, setChapter] = useState(0);
  useEffect(() => { if (props.open) setChapter(0); }, [props.open]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (!props.open) return;
      if (event.key === "Escape") props.onClose();
      if (event.key === "ArrowRight") setChapter(current => Math.min(3, current + 1));
      if (event.key === "ArrowLeft") setChapter(current => Math.max(0, current - 1));
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [props]);
  if (!props.open) return null;
  const name = props.recipient || "Someone special";
  const flowerType = ["rose", "tulip", "sunflower", "wildflower"].includes(props.flower) ? props.flower : "wildflower";

  return <div className={`experience experience-${props.theme}`} role="dialog" aria-modal="true" aria-label="Recipient letter preview">
    <button className="experience-close" onClick={props.onClose}>× <span>Exit preview</span></button>
    <div className="experience-dots">{[0,1,2,3].map(dot=><button key={dot} onClick={()=>setChapter(dot)} className={chapter===dot?"active":""} aria-label={`Open chapter ${dot+1}`}></button>)}</div>

    <section className={`experience-screen opening ${chapter===0?"active":""}`}>
      <div className="experience-stars">✦　·　✧　·　✦</div>
      <p>A LITTLE WORLD WAS MADE FOR</p><h1>{name}</h1><span className="experience-occasion">{props.occasion} edition</span>
      <div className="tiny-envelope"><div>♡</div></div>
      <button onClick={()=>setChapter(1)}>Open your story <span>→</span></button>
      <small>Best experienced slowly</small>
    </section>

    <section className={`experience-screen memories ${chapter===1?"active":""}`}>
      <div className="chapter-label">CHAPTER ONE · OUR MEMORIES</div><h2>The moments worth keeping.</h2>
      <div className={`experience-photos count-${Math.min(props.photos.length,4)}`}>
        {(props.photos.length?props.photos.slice(0,4):["","",""]).map((photo,index)=><figure key={index} style={{transform:`rotate(${index%2?3:-3}deg)`}}>{photo?<img src={photo} alt={`Shared memory ${index+1}`}/>:<div className="photo-placeholder">{index===0?"♡":index===1?"✦":"☺"}</div>}<figcaption>{index===0?"The person being celebrated":index===1?"The one cheering for you":"A memory we kept"}</figcaption></figure>)}
      </div><button className="experience-next" onClick={()=>setChapter(2)}>There is something for you →</button>
    </section>

    <section className={`experience-screen bloom-screen ${chapter===2?"active":""}`}>
      <div className="chapter-label">CHAPTER TWO · A DIGITAL BOUQUET</div><h2><em>Flowers that never wilt.</em></h2>
      <div className={`botanical-bouquet bouquet-${flowerType}`} aria-label={`${flowerType} bouquet blooming`}>
        {bouquetLayout.map((position,index)=><div className={`botanical-flower flower-${index + 1}`} key={index} style={{"--delay":`${index*.16}s`,"--x":`${position.x}px`,"--y":`${position.y}px`,"--rotate":`${position.rotate}deg`,"--flower-scale":position.scale} as React.CSSProperties}>
          <span className="flower-stem"><i className="leaf leaf-left"/><i className="leaf leaf-right"/></span>
          <span className="flower-head"><FlowerBloom type={flowerType} index={index}/></span>
        </div>)}
        <div className="bouquet-wrap-paper"><span/></div><div className="bouquet-ribbon">for {name}</div>
      </div>
      <p>Whenever you return to this letter, they will bloom for you all over again.</p><button className="experience-next" onClick={()=>setChapter(3)}>Read your letter →</button>
    </section>

    <section className={`experience-screen final-letter ${chapter===3?"active":""}`}>
      <article><small>A PRIVATE LETTER FOR</small><h2>{name}</h2><h3>{props.headline}</h3><p>{props.message}</p><p className="experience-signature">With all the words I wanted you to keep,<br/><b>{props.sender}</b></p></article>
      <div className="final-actions"><button onClick={()=>setChapter(0)}>↻ Experience again</button><button onClick={props.onClose}>Return to editing</button></div>
    </section>
  </div>;
}
