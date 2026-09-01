const state={theme:'pixel'};
const prices={pixel:'RM3.90',news:'RM3.90',garden:'RM7.90'};
const names={pixel:'Player Two',news:'The Special Edition',garden:'A Garden for You'};
const defaults={recipient:'Aira',headline:'You make ordinary days feel special.',message:'I don’t always know how to say things out loud, so I made you this tiny corner of the internet instead. I hope you remember that your existence makes someone’s world a little softer.',sender:'Someone who adores you'};
const $=id=>document.getElementById(id);
function updateText(type,value){document.querySelectorAll('.out-'+type).forEach(el=>el.textContent=value||({recipient:'Someone',headline:'A letter made only for you.',message:'Your words will appear here...',sender:'Secret admirer'}[type]));if(type==='message')$('count').textContent=value.length}
['recipient','headline','message','sender'].forEach(id=>$(id).addEventListener('input',e=>updateText(id,e.target.value)));
document.querySelectorAll('.theme-card').forEach(btn=>btn.addEventListener('click',()=>{state.theme=btn.dataset.theme;document.querySelectorAll('.theme-card').forEach(x=>{x.classList.toggle('active',x===btn);x.setAttribute('aria-checked',x===btn)});$('letterPreview').className='letter-preview theme-'+state.theme;$('priceLabel').textContent=prices[state.theme]}));
$('resetBtn').addEventListener('click',()=>{Object.entries(defaults).forEach(([key,value])=>{$(key).value=value;updateText(key,value)})});
$('publishBtn').addEventListener('click',()=>{$('orderTheme').textContent=names[state.theme];$('orderPrice').textContent=prices[state.theme];$('publishDialog').showModal()});
$('closeDialog').addEventListener('click',()=>$('publishDialog').close());
$('publishDialog').addEventListener('click',e=>{if(e.target===$('publishDialog'))$('publishDialog').close()});
$('howBtn').addEventListener('click',()=>document.querySelector('.studio').scrollIntoView({behavior:'smooth'}));
