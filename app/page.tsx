"use client";

import Link from "next/link";
import { useState } from "react";

const occasions = [
  { id: "graduation", icon: "🎓", name: "Graduation", note: "Celebrate every step that brought them here" },
  { id: "love", icon: "♡", name: "Love", note: "Say the things that deserve more than a text" },
  { id: "birthday", icon: "🎂", name: "Birthday", note: "Make their day feel like its own little world" },
  { id: "friendship", icon: "✦", name: "Friendship", note: "Keep the memories that made you both laugh" },
];

const themes = [
  { id: "player-two", eyebrow: "PIXEL STORY", name: "Player Two", description: "Story levels, memory unlocks and a final letter reward.", price: "RM3.90", art: "pixel" },
  { id: "special-edition", eyebrow: "PERSONAL NEWSPAPER", name: "The Special Edition", description: "Turn names, photographs and memories into headline news.", price: "RM3.90", art: "news" },
  { id: "garden", eyebrow: "ANIMATED GARDEN", name: "A Garden for You", description: "A dreamy world where every flower blooms for someone special.", price: "RM7.90", art: "garden" },
];

export default function Home() {
  const [occasion, setOccasion] = useState("graduation");
  return (
    <main>
      <nav className="nav"><Link href="/" className="logo">just for you<span>.</span></Link><div className="nav-links"><a href="#themes">Themes</a><a href="#how">How it works</a></div><Link href={`/create?occasion=${occasion}`} className="small-button">Create a letter</Link></nav>

      <section className="hero-section">
        <div className="hero-copy"><p className="eyebrow">ONLINE LETTER STUDIO</p><h1>Some words deserve their own <em>little world.</em></h1><p>Create a personal experience filled with your memories, animated flowers and a letter they can return to whenever they miss you.</p><Link href={`/create?occasion=${occasion}`} className="primary-button">Start creating <span>→</span></Link></div>
        <div className="hero-art" aria-label="Animated letter and flowers"><div className="sun"></div><div className="floating-note note-one">a memory worth keeping ♡</div><div className="floating-note note-two">made only for you</div><div className="envelope-art"><div className="letter-peek"><span>Dear you,</span><b>I made this little corner of the internet for you.</b></div><div className="envelope-front"></div></div><div className="flower-row"><i>✿</i><i>❀</i><i>✾</i><i>❁</i><i>✿</i></div></div>
      </section>

      <section className="occasion-section"><div><p className="eyebrow">FIRST, TELL US</p><h2>What are we celebrating?</h2></div><div className="occasion-grid">{occasions.map(item=><button key={item.id} onClick={()=>setOccasion(item.id)} className={`occasion-card ${occasion===item.id?"selected":""}`}><span>{item.icon}</span><div><b>{item.name}</b><small>{item.note}</small></div><i>{occasion===item.id?"✓":"→"}</i></button>)}</div></section>

      <section id="themes" className="themes-section"><div className="section-title"><p className="eyebrow">CHOOSE THEIR WORLD</p><h2>Not just a letter.<br/><em>An experience.</em></h2><p>Every theme tells the story differently, but every letter comes with flowers that never wilt.</p></div><div className="theme-grid">{themes.map(theme=><article className="theme-product" key={theme.id}><div className={`theme-art ${theme.art}`}><span className="theme-label">{theme.eyebrow}</span>{theme.art==="pixel"&&<><div className="pixel-heart">♥</div><div className="pixel-players"><i></i><i></i></div><div className="pixel-dialog">ACHIEVEMENT UNLOCKED</div></>}{theme.art==="news"&&<div className="paper"><small>SPECIAL EDITION</small><b>YOU ARE<br/>THE GOOD NEWS</b><span>♡ EXCLUSIVE STORY INSIDE</span></div>}{theme.art==="garden"&&<><div className="garden-letter">a garden planted<br/>only for you</div><div className="garden-blooms">✿ ❀ ✾ ❁ ✿</div></>}</div><div className="theme-info"><div><small>{theme.eyebrow}</small><h3>{theme.name}</h3><p>{theme.description}</p></div><div className="theme-bottom"><b>{theme.price}</b><Link href={`/create?occasion=${occasion}&theme=${theme.id}`}>Choose theme →</Link></div></div></article>)}</div></section>

      <section id="how" className="how-section"><p className="eyebrow">HOW IT WORKS</p><h2>From your heart to their screen.</h2><div className="steps"><div><span>01</span><b>Choose a world</b><p>Pick an occasion and the visual story that feels like them.</p></div><div><span>02</span><b>Add your memories</b><p>Write your letter, add photos and choose the flowers you want to give.</p></div><div><span>03</span><b>Preview before paying</b><p>Experience the full letter first. Change anything until it feels right.</p></div><div><span>04</span><b>Send their private link</b><p>After publishing, share one little corner of the internet made for them.</p></div></div></section>

      <footer><div className="logo">just for you<span>.</span></div><p>Flowers that never wilt. Words worth keeping.</p><small>© 2026 Intan Maisara</small></footer>
    </main>
  );
}
