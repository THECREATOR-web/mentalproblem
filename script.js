/* Minimal interactive site data + UI logic */

const PROBLEMS = [
  {id:1,name:"Generalized Anxiety",desc:"Persistent worry and tension.",tags:["anxiety"],severity:"moderate",symptoms:["Excessive worry","Restlessness","Irritability","Sleep trouble"],methods:[{title:"4-4-4 Breathing",type:"exercise",steps:["Breathe in for 4 seconds","Hold for 4 seconds","Exhale for 4 seconds","Repeat 4–6 times"]},{title:"Grounding 5-4-3-2-1",type:"exercise",steps:["Name 5 things you can see","4 things you can touch","3 things you can hear","2 things you can smell","1 thing you can taste"]}]},
  {id:2,name:"Panic Attacks",desc:"Sudden intense fear with physical symptoms.",tags:["anxiety","panic"],severity:"high",symptoms:["Racing heart","Shortness of breath","Dizziness","Shaking"],methods:[{title:"Box Breathing",type:"exercise",steps:["Inhale 4s","Hold 4s","Exhale 4s","Hold 4s — repeat"]},{title:"Grounding (5 senses)",type:"exercise",steps:["Use your senses to re-orient yourself; list items out loud"]}]},
  {id:3,name:"Depression (low mood)",desc:"Persistent low mood, loss of interest, and changes in thinking or physical functioning that last for weeks or longer. Depression can make everyday tasks feel heavy, reduce motivation, and affect sleep, appetite, concentration, and self-worth. People experience depression in different ways — from quiet numbness to intense sadness — and small, gradual steps often help alongside professional support when needed.",tags:["depression"],severity:"moderate",symptoms:["Low energy","Hopeless feelings","Sleep/appetite changes","Loss of interest","Trouble concentrating","Self-critical thoughts"],methods:[{title:"Gentle Activity",type:"tip",steps:["Try a 5–10 minute walk","Do a tiny task you enjoy"]},{title:"Mood Journal",type:"tip",steps:["Write one thing you noticed that felt okay today"]}]},
  {id:4,name:"Insomnia",desc:"Difficulty falling or staying asleep.",tags:["sleep"],severity:"low",symptoms:["Trouble falling asleep","Waking at night","Daytime tiredness"],methods:[{title:"Bedtime Routine",type:"tip",steps:["Dim lights 30m before bed","Avoid screens","Try calming tea (non-caffeinated)"]},{title:"4-7-8 Breathing",type:"exercise",steps:["Inhale 4s","Hold 7s","Exhale 8s — repeat"]}]},
  {id:5,name:"Social Anxiety",desc:"Fear of social situations and judgement.",tags:["anxiety","social"],severity:"moderate",symptoms:["Fear of embarrassment","Avoiding events","Sweating or blushing"],methods:[{title:"Small Exposure",type:"tip",steps:["Try a short friendly interaction","Practice beforehand"]},{title:"Grounding",type:"exercise",steps:["Focus on breath and senses to stay present"]}]},
  {id:6,name:"PTSD (trauma response)",desc:"Intrusive memories and hypervigilance after trauma.",tags:["trauma"],severity:"high",symptoms:["Flashbacks","Avoidance","Irritability","Sleep issues"],methods:[{title:"Safe-Space Visualization",type:"exercise",steps:["Close eyes, picture a calm safe place","Name details until you feel steadier"]},{title:"5-4-3-2-1 Grounding",type:"exercise",steps:["Use senses to reanchor"]}]},
  {id:7,name:"OCD (intrusive thoughts)",desc:"Obsessive-Compulsive patterns involve intrusive, distressing thoughts (obsessions) and repetitive behaviours or mental acts (compulsions) performed to reduce anxiety. These rituals can be time-consuming and interfere with work, relationships, and wellbeing. Recovery often involves learning to tolerate uncertainty, gradual exposure to feared situations, and strategies to reduce ritual-driven behaviour — ideally with professional guidance.",tags:["ocd"],severity:"moderate",symptoms:["Repetitive checking","Intrusive images or thoughts","Strong urges to perform rituals"],methods:[{title:"Delay Technique",type:"tip",steps:["If a compulsion arises, postpone for 10 minutes and note the urge"]},{title:"Mindful Observation",type:"exercise",steps:["Notice the thought without acting on it"]}]},
  {id:13,name:"Autism Spectrum (neurodiversity)",desc:"A neurodevelopmental difference affecting social communication, sensory processing, and preferences for routine. People on the autism spectrum may experience differences in how they interpret social cues, prefer predictable environments, and use repetitive behaviours (stimming) to self-regulate. Strengths often include focused interests, pattern recognition, and detailed thinking — while challenges can include sensory overwhelm or social fatigue.",tags:["autism","neurodiversity"],severity:"varies",symptoms:["Social communication differences","Sensory sensitivities (noise, lights, textures)","Strong preference for routines","Repetitive movements or stimming"],methods:[{title:"Sensory Toolkit",type:"tip",steps:["Create a small kit (earplugs, fidget, sunglasses)","Use it proactively when environments feel overwhelming"]},{title:"Structured Routine",type:"tip",steps:["Build predictable daily steps","Use visual schedules or timers"]},{title:"Social Script Practice",type:"exercise",steps:["Roleplay short social interactions","Prepare one-liners for common situations"]}]},
  {id:8,name:"ADHD (inattention)",desc:"Difficulty sustaining attention or organizing tasks.",tags:["adhd"],severity:"low",symptoms:["Easily distracted","Forgetful","Procrastination"],methods:[{title:"Pomodoro Mini",type:"tip",steps:["Work 25 minutes, break 5 minutes"]},{title:"Movement Breaks",type:"tip",steps:["Try 2 minutes of stretching or walking between tasks"]}]},
  {id:9,name:"PMS / Mood swings",desc:"Cyclical mood changes related to hormonal cycles.",tags:["mood","hormones"],severity:"low",symptoms:["Irritability","Crying spells","Bloating"],methods:[{title:"Comfort Plan",type:"tip",steps:["Plan cozy activities","Use heat packs and gentle movement"]}]},
  {id:10,name:"Low Self-Esteem",desc:"Persistent negative self-view.",tags:["self"],severity:"low",symptoms:["Self-criticism","Avoiding challenges"],methods:[{title:"Affirmation Practice",type:"tip",steps:["Write three small achievements each day"]},{title:"Small Wins",type:"tip",steps:["Break tasks into tiny steps and celebrate each"]}]},
  {id:11,name:"Anger / Irritability",desc:"Strong feelings of anger that are hard to control.",tags:["anger"],severity:"moderate",symptoms:["Tense muscles","Irritability","Yelling"],methods:[{title:"Timeout",type:"tip",steps:["Step away for 5 minutes","Try breathing or a short walk"]},{title:"Progressive Relaxation",type:"exercise",steps:["Tense and release muscle groups from feet to head"]}]},
  {id:12,name:"Obsessive Worry (health)",desc:"Frequent health worries without reassurance.",tags:["anxiety","health"],severity:"moderate",symptoms:["Checking symptoms","Frequent doctor visits"],methods:[{title:"Scheduled Checking",type:"tip",steps:["Limit checking to 2 planned times a day"]},{title:"Distraction Technique",type:"tip",steps:["Switch to a task for 15 minutes when worry rises"]}]}
];

// --- UI logic ---
const cardsRoot = document.getElementById('cards');
const searchInput = document.getElementById('searchInput');
const tagFilter = document.getElementById('tagFilter');
const modal = document.getElementById('detailModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSymptoms = document.getElementById('modalSymptoms');
const modalMethods = document.getElementById('modalMethods');
const exerciseArea = document.getElementById('exerciseArea');
const modalClose = document.getElementById('modalClose');

let currentProblems = PROBLEMS.slice();

function uniqueTags(list){
  const s = new Set();
  list.forEach(p=>p.tags.forEach(t=>s.add(t)));
  return [...s];
}

function populateTagFilter(){
  const tags = uniqueTags(PROBLEMS);
  tags.forEach(t=>{
    const o = document.createElement('option'); o.value=t; o.textContent = t; tagFilter.appendChild(o);
  });
}

function renderProblems(list){
  cardsRoot.innerHTML='';
  list.forEach(p=>{
    const el = document.createElement('article'); el.className='card';
    el.innerHTML = `<h3>${escapeHtml(p.name)}</h3><div class="meta">${escapeHtml(p.desc)}</div>`;
    const tags = document.createElement('div'); tags.className='tags';
    p.tags.forEach(t=>{const sp=document.createElement('span');sp.className='tag';sp.textContent=t;tags.appendChild(sp)});
    el.appendChild(tags);
    el.addEventListener('click',()=>openModal(p));
    cardsRoot.appendChild(el);
  });
}

function escapeHtml(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')}

function openModal(problem){
  modalTitle.textContent = problem.name;
  modalDesc.textContent = problem.desc;
  modalSymptoms.innerHTML = '';
  problem.symptoms.forEach(s=>{const li=document.createElement('li');li.textContent=s;modalSymptoms.appendChild(li)});
  modalMethods.innerHTML = '';
  problem.methods.forEach((m,idx)=>{
    const div = document.createElement('div'); div.className='method';
    const h = document.createElement('strong'); h.textContent = m.title; div.appendChild(h);
    const p = document.createElement('div'); p.style.marginTop='6px'; p.textContent = m.steps.join(' • ');
    div.appendChild(p);
    const btn = document.createElement('button'); btn.className='btn'; btn.textContent='Try';
    btn.addEventListener('click',()=>launchMethod(m));
    div.appendChild(btn);
    modalMethods.appendChild(div);
  });
  exerciseArea.innerHTML = '';
  modal.classList.remove('hidden');
}

function closeModal(){ modal.classList.add('hidden'); exerciseArea.innerHTML=''; }
modalClose.addEventListener('click',closeModal);
modal.addEventListener('click',(e)=>{ if(e.target===modal) closeModal(); });

function launchMethod(method){
  exerciseArea.innerHTML='';
  if(method.type==='exercise'){
    const h = document.createElement('h4'); h.textContent = method.title; exerciseArea.appendChild(h);
    const p = document.createElement('div'); p.className='muted'; p.style.marginTop='6px'; p.textContent = method.steps.join(' — ');
    exerciseArea.appendChild(p);

    // breathing exercise special
    if(/breath|breathing|box/i.test(method.title)){
      const circle = document.createElement('div'); circle.className='breathing-circle grow';
      exerciseArea.appendChild(circle);
      const info = document.createElement('div'); info.style.textAlign='center'; info.style.marginTop='10px'; info.textContent='Follow the circle: breathe with its size change.'; exerciseArea.appendChild(info);
      // animate grow/shrink loop
      let grow=true;
      window.breathingInterval && clearInterval(window.breathingInterval);
      window.breathingInterval = setInterval(()=>{
        circle.classList.toggle('grow',grow);
        circle.classList.toggle('shrink',!grow);
        grow = !grow;
      },4000);
    }

    // grounding interactive
    if(/grounding|5-4-3-2-1/i.test(method.title)){ startGrounding(method.steps); }
  } else {
    const h = document.createElement('h4'); h.textContent = method.title; exerciseArea.appendChild(h);
    const ul = document.createElement('ul'); method.steps.forEach(s=>{const li=document.createElement('li');li.textContent=s;ul.appendChild(li)}); exerciseArea.appendChild(ul);
  }
}

function startGrounding(steps){
  const cont = document.createElement('div'); cont.style.marginTop='10px';
  steps.forEach((s,idx)=>{
    const p = document.createElement('div'); p.style.margin='8px 0'; p.innerHTML = `<strong>${idx+1}.</strong> ${s}`;
    cont.appendChild(p);
  });
  exerciseArea.appendChild(cont);
}

// search & filter
searchInput.addEventListener('input',applyFilters);
tagFilter.addEventListener('change',applyFilters);

function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const tag = tagFilter.value;
  const filtered = PROBLEMS.filter(p=>{
    const inTag = tag? p.tags.includes(tag) : true;
    const inQ = q.length===0 || (p.name+" "+p.desc+" "+p.symptoms.join(' ')+" "+p.methods.map(m=>m.title).join(' ')).toLowerCase().includes(q);
    return inTag && inQ;
  });
  renderProblems(filtered);
}

// startup
populateTagFilter(); renderProblems(PROBLEMS);

// accessibility: close modal on Esc
window.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal()});

// small helper: when navigating away, clear intervals
window.addEventListener('beforeunload',()=>{window.breathingInterval && clearInterval(window.breathingInterval)});
