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
  { x: -128, y: 48, rotate: -18, scale: .78 },
  { x: -84, y: 8, rotate: -11, scale: .95 },
  { x: -40, y: 35, rotate: -5, scale: .86 },
  { x: 0, y: -5, rotate: 0, scale: 1.08 },
  { x: 42, y: 32, rotate: 6, scale: .88 },
  { x: 86, y: 5, rotate: 12, scale: .96 },
  { x: 130, y: 50, rotate: 19, scale: .76 },
];

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
      <div className="chapter-label">CHAPTER TWO · FLOWERS THAT NEVER WILT</div><h2>I couldn&apos;t hand these to you,<br/><em>so I made them bloom here.</em></h2>
      <div className={`bouquet bouquet-${flowerType}`} aria-label={`${flowerType} bouquet blooming`}>
        {bouquetLayout.map((position,index)=><div className={`botanical-flower flower-${index + 1}`} key={index} style={{"--delay":`${index*.16}s`,"--x":`${position.x}px`,"--y":`${position.y}px`,"--rotate":`${position.rotate}deg`,"--flower-scale":position.scale} as React.CSSProperties}>
          <span className="flower-stem"><i className="leaf leaf-left"/><i className="leaf leaf-right"/></span>
          <span className="flower-head"><i/><i/><i/><i/><i/><i/><b/></span>
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
