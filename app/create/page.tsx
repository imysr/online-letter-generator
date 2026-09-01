"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import LetterPreviewExperience from "@/components/letter-preview-experience";

const themeNames: Record<string,string> = {"player-two":"Player Two","special-edition":"The Special Edition",garden:"A Garden for You"};

function Creator() {
  const params=useSearchParams();
  const [step,setStep]=useState(1);
  const [recipient,setRecipient]=useState("Aira");
  const [sender,setSender]=useState("Someone who is proud of you");
  const [headline,setHeadline]=useState("One chapter completed. A whole future ahead.");
  const [message,setMessage]=useState("I hope you pause today and allow yourself to feel proud of every quiet effort that brought you here.");
  const [photos,setPhotos]=useState<string[]>([]);
  const [flower,setFlower]=useState("rose");
  const [previewOpen,setPreviewOpen]=useState(false);
  const occasion=params.get("occasion")||"graduation";
  const theme=params.get("theme")||"player-two";
  const price=theme==="garden"?"RM7.90":"RM3.90";
  const progress=useMemo(()=>`${Math.round(step/4*100)}%`,[step]);

  function addPhotos(files: FileList|null){if(!files)return;const selected=[...files].slice(0,6-photos.length);selected.forEach(file=>{if(file.size<=5*1024*1024){const reader=new FileReader();reader.onload=()=>setPhotos(current=>[...current,String(reader.result)].slice(0,6));reader.readAsDataURL(file)}})}

  return <main className="creator-page">
    <header className="creator-header"><Link href="/" className="logo">just for you<span>.</span></Link><div className="creator-progress"><span style={{width:progress}}></span></div><div className="save-note">Preview mode</div></header>
    <div className="creator-layout">
      <aside className="creator-sidebar"><p className="eyebrow">YOUR LETTER</p><h1>{themeNames[theme]}</h1><span className="occasion-pill">{occasion}</span><nav>{["The story","Your memories","The flowers","Final letter"].map((label,index)=><button key={label} onClick={()=>setStep(index+1)} className={step===index+1?"active":""}><i>{index+1}</i><span>{label}</span>{step>index+1&&<b>✓</b>}</button>)}</nav><div className="creator-price"><span>Publish this letter</span><b>{price}</b><small>One time payment</small></div></aside>

      <section className="creator-form">
        {step===1&&<div className="form-step"><p className="eyebrow">STEP 01</p><h2>Tell us about your person.</h2><p className="form-intro">These details shape the opening chapter of their experience.</p><label>Receiver&apos;s name<input value={recipient} onChange={e=>setRecipient(e.target.value)} maxLength={32}/></label><label>Your name or signature<input value={sender} onChange={e=>setSender(e.target.value)} maxLength={45}/></label><label>Opening headline<input value={headline} onChange={e=>setHeadline(e.target.value)} maxLength={80}/></label></div>}
        {step===2&&<div className="form-step"><p className="eyebrow">STEP 02</p><h2>Add the moments you kept.</h2><p className="form-intro">Choose photos of the receiver, the sender and the memories you share.</p><label className="upload-zone"><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={e=>addPhotos(e.target.files)}/><span>＋</span><b>Choose up to six photos</b><small>JPG, PNG or WebP. Maximum 5 MB each.</small></label><div className="uploaded-grid">{photos.map((photo,index)=><div key={index}><img src={photo} alt={`Memory ${index+1}`}/><button onClick={()=>setPhotos(photos.filter((_,i)=>i!==index))}>×</button></div>)}</div><p className="privacy-copy">Photos stay in this browser during the prototype. Private storage will be added before launch.</p></div>}
        {step===3&&<div className="form-step"><p className="eyebrow">STEP 03</p><h2>Choose flowers that feel like them.</h2><p className="form-intro">Every letter includes flowers that bloom as the receiver reaches this chapter.</p><div className="flower-options">{[{id:"rose",icon:"🌹",name:"Deep roses",meaning:"Admiration"},{id:"tulip",icon:"🌷",name:"Soft tulips",meaning:"Affection"},{id:"sunflower",icon:"🌻",name:"Sunflowers",meaning:"Pride and joy"},{id:"wildflower",icon:"💐",name:"Wildflowers",meaning:"Beautiful memories"}].map(item=><button key={item.id} onClick={()=>setFlower(item.id)} className={flower===item.id?"selected":""}><span>{item.icon}</span><b>{item.name}</b><small>{item.meaning}</small></button>)}</div><label>Message on the flower card<input defaultValue={`For ${recipient}, with so much pride.`} maxLength={70}/></label></div>}
        {step===4&&<div className="form-step"><p className="eyebrow">STEP 04</p><h2>Now write what you mean.</h2><p className="form-intro">This appears after their story, memories and flowers.</p><label>Your letter<textarea value={message} onChange={e=>setMessage(e.target.value)} rows={10} maxLength={1400}/><small>{message.length}/1400</small></label><div className="ready-card"><span>♡</span><div><b>Your experience is ready to preview</b><p>Nothing will be published or charged yet.</p></div></div></div>}
        <div className="form-actions"><button className="back-button" disabled={step===1} onClick={()=>setStep(Math.max(1,step-1))}>← Back</button>{step<4?<button className="primary-button" onClick={()=>setStep(step+1)}>Continue <span>→</span></button>:<button className="primary-button" onClick={()=>setPreviewOpen(true)}>Preview their letter <span>→</span></button>}</div>
      </section>

      <aside className="mini-preview"><div className="preview-toolbar"><span></span><span></span><span></span><small>LIVE PREVIEW</small></div><div className={`preview-world ${theme}`}><p>A LITTLE STORY FOR</p><h2>{recipient||"Someone special"}</h2><div className="preview-memory">{photos[0]?<img src={photos[0]} alt="First memory"/>:<span>♡</span>}</div><h3>{headline}</h3><p className="preview-message">{message}</p><div className="preview-flowers">{flower==="rose"?"🌹 🌹 🌹":flower==="tulip"?"🌷 🌷 🌷":flower==="sunflower"?"🌻 🌻 🌻":"🌸 🌼 🌷"}</div><small>from {sender}</small></div><p className="watermark-note">FREE PREVIEW</p></aside>
    </div>
    <LetterPreviewExperience open={previewOpen} onClose={()=>setPreviewOpen(false)} recipient={recipient} sender={sender} headline={headline} message={message} photos={photos} flower={flower} occasion={occasion} theme={theme}/>
  </main>;
}

export default function CreatePage(){return <Suspense fallback={<div className="loading">Opening the studio…</div>}><Creator/></Suspense>}
