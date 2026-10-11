"use client";

import { useState } from "react";
import "./f1-letter.css";

const chapters = ["Starting grid", "Victory lap", "Bouquet", "Letter"];

export default function F1LetterPrototype() {
  const [chapter, setChapter] = useState(0);
  return <main className="race-letter">
    <header className="race-nav"><span>01 / 01</span><strong>A LETTER BEYOND THE FINISH LINE</strong><span>PRIVATE EDITION</span></header>
    <section className={`race-panel race-opening ${chapter===0?"active":""}`}>
      <div className="start-lights">{[0,1,2,3,4].map(light=><i key={light}/>)}</div>
      <p className="race-kicker">FROM THE STARTING GRID TO YOUR VICTORY LAP</p>
      <h1>For Syuk.</h1><h2>Class of 2026</h2>
      <div className="race-number">26</div>
      <p className="race-intro">A one-of-one graduation letter, made only for you.</p>
      <button onClick={()=>setChapter(1)}>LIGHTS OUT <span>→</span></button>
    </section>

    <section className={`race-panel race-memories ${chapter===1?"active":""}`}>
      <div className="race-kicker">LAP 01 · THE MOMENTS THAT GOT YOU HERE</div>
      <h2>Your victory lap.</h2>
      <div className="paddock-grid">
        <figure><div>YOUR PHOTO</div><figcaption>THE GRADUATE</figcaption></figure>
        <figure><div>OUR MEMORY</div><figcaption>WORTH KEEPING</figcaption></figure>
        <figure><div>MY PHOTO</div><figcaption>QUIETLY CHEERING</figcaption></figure>
      </div>
      <blockquote>“Some victories deserve more than applause. They deserve to be remembered.”</blockquote>
      <button onClick={()=>setChapter(2)}>CLAIM YOUR BOUQUET <span>→</span></button>
    </section>

    <section className={`race-panel race-bouquet ${chapter===2?"active":""}`}>
      <div className="race-kicker">LAP 02 · FLOWERS THAT NEVER WILT</div>
      <h2>A victory bouquet.</h2>
      <div className="f1-bouquet">
        <div className="f1-stems">{[0,1,2,3,4,5,6,7,8].map(i=><i key={i}/>)}</div>
        <div className="f1-flowers">{["rose","baby","lily","rose","lily","rose","baby","lily","rose"].map((kind,i)=><span className={kind} key={i}>{kind==="rose"?"✿":kind==="lily"?"✧":"❀"}</span>)}</div>
        <div className="f1-wrap"><b>FOR SYUK</b><small>GRADUATION 2026</small></div>
      </div>
      <p>Whenever you return, they will bloom for you all over again.</p>
      <button onClick={()=>setChapter(3)}>READ THE LETTER <span>→</span></button>
    </section>

    <section className={`race-panel race-final ${chapter===3?"active":""}`}>
      <article>
        <div className="race-kicker">FINAL LAP · FROM INTAN</div>
        <h2>Happy Graduation Day, Syuk.</h2>
        <p>I badly wanted to give you a handwritten letter because I love giving handwritten letters to someone special. Tapi sik dapat, so I made this little world for you instead.</p>
        <p>Thank you for keeping up ngan OfflineYsr, even with all the goofy and sik berapa subtle posts. This online letter is my way of ikut “hadir” dengan kitak on your graduation day.</p>
        <p>No pressure, no expectation. I’m simply proud of you—and quietly clapping for you from here.</p>
        <div className="race-signature">With care, always<br/><b>Intan</b></div>
      </article>
      <div className="race-licence"><span className="licence-seal">IM</span><p><b>ORIGINAL DIGITAL LETTER</b><br/>Created by Intan Maisara / imysr<br/><small>Copyright © 2026 · One-of-one private edition · Personal viewing only</small></p><strong>01 / 01</strong></div>
      <button onClick={()=>setChapter(0)}>REPLAY THE VICTORY LAP ↻</button>
    </section>

    <nav className="race-progress">{chapters.map((label,i)=><button key={label} className={chapter===i?"active":""} onClick={()=>setChapter(i)}><span>0{i+1}</span>{label}</button>)}</nav>
  </main>;
}
