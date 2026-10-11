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
  envelopeColour: string;
};

const bouquetLayout = [
  { x: 0, y: 48, rotate: -32, scale: .78 },
  { x: 0, y: 8, rotate: -22, scale: .95 },
  { x: 0, y: 35, rotate: -12, scale: .86 },
  { x: 0, y: -5, rotate: 0, scale: 1.08 },
  { x: 0, y: 32, rotate: 12, scale: .88 },
  { x: 0, y: 5, rotate: 22, scale: .96 },
  { x: 0, y: 50, rotate: 32, scale: .76 },
  { x: 0, y: 22, rotate: -17, scale: .92, kind: "lily" },
  { x: 0, y: 24, rotate: 18, scale: .88, kind: "lily" },
];

const fillerSprigs = [
  { rotate: -38, height: 215 }, { rotate: -29, height: 240 },
  { rotate: -20, height: 205 }, { rotate: -10, height: 245 },
  { rotate: 8, height: 230 }, { rotate: 16, height: 250 },
  { rotate: 27, height: 215 }, { rotate: 37, height: 235 },
];

function FlowerBloom({ type, index }: { type: string; index: number }) {
  const kind = type === "wildflower" ? ["daisy", "rose", "daisy", "rose"][index % 4] : type;
  const petalId = `petal-${kind}-${index}`;
  const centreId = `centre-${kind}-${index}`;

  return <svg className={`flower-art flower-art-${kind}`} viewBox="0 0 100 100" aria-hidden="true">
    <defs>
      <radialGradient id={petalId} cx="35%" cy="28%" r="72%">
        <stop offset="0" stopColor={kind === "sunflower" ? "#fff3a8" : kind === "tulip" ? "#ffb4c5" : kind === "daisy" || kind === "lily" ? "#fffdf4" : "#ff91a8"}/>
        <stop offset=".58" stopColor={kind === "sunflower" ? "#f6bd32" : kind === "tulip" ? "#e95278" : kind === "daisy" ? "#f2e5e8" : kind === "lily" ? "#f3d9df" : "#d93f64"}/>
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
    {kind === "lily" && <g>{Array.from({length:6}).map((_,petal)=><path key={petal} d="M50 51C34 37 34 12 50 3c16 10 16 34 0 48Z" fill={`url(#${petalId})`} stroke="#d39aa9" strokeWidth="1" transform={`rotate(${petal*60} 50 51)`}/>)}<circle cx="50" cy="51" r="9" fill="#e2b855"/>{[-13,-6,6,13].map((x,stamen)=><g key={stamen}><path d={`M50 51Q${50+x} 36 ${50+x} 25`} fill="none" stroke="#d1a447" strokeWidth="2"/><ellipse cx={50+x} cy="24" rx="3" ry="5" fill="#9b6135"/></g>)}</g>}
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

    <section className={`experience-screen opening vintage-opening palette-${props.envelopeColour} ${chapter===0?"active":""}`}>
      <div className="vintage-postmark">JUST FOR YOU · PRIVATE POST</div>
      <p>A LETTER HAS ARRIVED FOR</p><h1>{name}</h1><span className="experience-occasion">{props.occasion} edition</span>
      <div className="vintage-envelope"><div className="envelope-address"><small>TO</small><b>{name}</b><span>with care, always</span></div><div className="envelope-flap"/><div className="vintage-stamp"><span>✿</span><small>JUST FOR YOU</small></div></div>
      <button onClick={()=>setChapter(1)}>Open your story <span>→</span></button>
      <small>Best experienced slowly</small>
    </section>

    <section className={`experience-screen memories ${chapter===1?"active":""}`}>
      <div className="chapter-label">CHAPTER ONE · OUR MEMORIES</div><h2>The moments worth keeping.</h2>
      <div className="memory-keepsakes">
        <div className="polaroid-pair">{[0,1].map(index=><figure className="memory-polaroid" key={index}>{props.photos[index]?<img src={props.photos[index]} alt={`Shared memory ${index+1}`}/>:<div className="photo-placeholder">{index===0?"♡":"✦"}</div>}<figcaption>{index===0?"The person being celebrated":"The one cheering for you"}</figcaption></figure>)}</div>
        <figure className="photobooth-strip"><div className="strip-title">OUR LITTLE ARCHIVE</div>{[2,3,4].map(index=><div className="strip-frame" key={index}>{props.photos[index]?<img src={props.photos[index]} alt={`Shared memory ${index+1}`}/>:<span>{index===2?"☺":index===3?"♡":"✦"}</span>}</div>)}<figcaption>a few moments we kept</figcaption></figure>
      </div><button className="experience-next" onClick={()=>setChapter(2)}>There is something for you →</button>
    </section>

    <section className={`experience-screen bloom-screen ${chapter===2?"active":""}`}>
      <div className="chapter-label">CHAPTER TWO · A DIGITAL BOUQUET</div><h2><em>Flowers that never wilt.</em></h2>
      <div className={`botanical-bouquet bouquet-${flowerType}`} aria-label={`${flowerType} bouquet blooming`}>
        <div className="bouquet-greenery" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>
        {fillerSprigs.map((sprig,index)=><div className="filler-sprig" key={`filler-${index}`} style={{"--sprig-rotate":`${sprig.rotate}deg`,"--sprig-height":`${sprig.height}px`,"--sprig-delay":`${.08*index}s`} as React.CSSProperties}><span className="filler-stem"/><i className="baby-bloom b1"/><i className="baby-bloom b2"/><i className="baby-bloom b3"/><i className="baby-bloom b4"/></div>)}
        {bouquetLayout.map((position,index)=><div className={`botanical-flower flower-${index + 1}`} key={index} style={{"--delay":`${index*.16}s`,"--x":`${position.x}px`,"--y":`${position.y}px`,"--rotate":`${position.rotate}deg`,"--flower-scale":position.scale} as React.CSSProperties}>
          <span className="flower-stem"><i className="leaf leaf-left"/><i className="leaf leaf-right"/></span>
          <span className="flower-head"><FlowerBloom type={position.kind || flowerType} index={index}/></span>
        </div>)}
        <div className="bouquet-wrap-paper"><span/></div><div className="bouquet-ribbon">for {name}</div>
      </div>
      <p>Whenever you return to this letter, they will bloom for you all over again.</p><button className="experience-next" onClick={()=>setChapter(3)}>Read your letter →</button>
    </section>

    <section className={`experience-screen final-letter ${chapter===3?"active":""}`}>
      <article><small>A PRIVATE LETTER FOR</small><h2>{name}</h2><h3>{props.headline}</h3><p>{props.message}</p><p className="experience-signature">With all the words I wanted you to keep,<br/><b>{props.sender}</b></p></article>
      <div className="final-actions"><button onClick={()=>setChapter(0)}>↻ Experience again</button><button onClick={props.onClose}>Return to editing</button></div>
      <footer className="letter-authenticity" aria-label="Original work licence">
        <div className="authenticity-mark" aria-hidden="true"><span>IM</span></div>
        <div className="authenticity-copy">
          <strong>AN ORIGINAL DIGITAL LETTER</strong>
          <span>One-of-one private edition · Created by Intan Maisara / imysr</span>
          <small>Copyright © 2026 Intan Maisara. All rights reserved. Personal viewing only. No copying, reproduction, redistribution, or resale.</small>
        </div>
        <div className="authenticity-number"><small>EDITION</small><b>01 / 01</b></div>
      </footer>
    </section>
  </div>;
}
