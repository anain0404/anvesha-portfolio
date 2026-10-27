const A='assets/';
const menu=[
 {id:'experience',name:'Work Experience',image:'work.jpg',description:"Professional experiences where I've applied AI, data, and product thinking to real-world problems."},
 {id:'projects',name:'Projects',image:'projects.jpg',description:'Self-initiated ideas, experiments, and products built with purpose.'},
 {id:'research',name:'Research',image:'research.jpg',description:'Exploring technology through science, research, and ethics.'},
 {id:'campus',name:'Campus Involvement',image:'purdue-clocktower.png',description:'Leadership, mentorship, and community at Purdue.'},
 {id:'story',name:'The Story',image:'story.jpg',description:'A little about me, my curiosity, and what inspires me.'},
 {id:'contact',name:'Coffee Chat',image:'contact.jpg',description:'A place to connect, exchange ideas, and say hello.'}
];
const experiences=[
 {"id": "ensora", "name": "Ensora Health", "role": "Product Owner Intern", "period": "Summer 2026", "category": "Healthcare · AI Product", "intro": "From listening to therapists to helping bring four agentic AI applications toward launch.", "tags": ["Product Discovery", "Agentic AI", "User Research", "Azure DevOps", "PRDs", "Python", "Streamlit"], "sections": [["The Beginning", "I came to Ensora Health excited about the intersection of healthcare, artificial intelligence, and product management. As a Product Owner Intern, I joined a team exploring how AI could reduce the administrative work that pulls therapists away from their clients. I was eager to learn what it really takes to bring an AI product from an early idea toward launch, especially in a field where the human experience matters so much."], ["Understanding the Problem", "It would have been easy to begin by asking what we could build with AI. Instead, I wanted to understand where therapists actually needed support. Their days involve far more than the time spent with clients, and even a promising technical solution would be of little value if it did not fit the way they worked. That became the guiding question for me: are we solving a real problem, or just finding a place to use new technology?"], ["Starting With the People", "I spoke with five therapists to learn about their experiences, day-to-day workflows, and recurring frustrations. Rather than jumping to feature ideas, I listened for patterns across those conversations and considered which needs appeared most meaningful. Those interviews changed the way I approached the work. They reminded me that product discovery is not about validating an idea you already love; it is about being willing to learn something that changes your idea."], ["Turning Insights Into Action", "The next challenge was turning what I heard into something a team could actually build. I worked on four product requirements documents (PRDs), translated user needs into user stories, and organized requirements in Azure DevOps. I had to think about the purpose of each feature, what a useful experience would look like, and how to make requirements clear enough for engineers and stakeholders to discuss. It was rewarding to watch a conversation with a therapist evolve into a concrete product direction."], ["Working Across Teams", "Product work did not stop when the requirements were written. I stayed involved in discussions with engineers and stakeholders, walked through ideas, asked questions, and incorporated feedback as development progressed. Sometimes the most useful contribution was clarifying what a user actually needed; other times it was helping connect a technical decision back to the larger product goal. I learned how much product ownership depends on communication, iteration, and keeping everyone aligned around the problem."], ["Exploring AI Product Development", "Over the summer, I contributed to the end-to-end development of four agentic AI applications, from early discovery and product definition through development and launch preparation. I also explored how to evaluate AI behavior using Python, Streamlit, and LLM-as-a-Judge approaches. Working with AI products taught me that a feature is not finished simply because a model can produce an answer. The experience needs to be useful, reliable, and appropriate for the people depending on it."], ["A Summer's Work, One Presentation", "Toward the end of my internship, I had the opportunity to present my summer's work to company leadership, including executives. Preparing that presentation pushed me to look beyond individual tasks and explain the larger story: what we had learned, why the work mattered, and how the pieces fit together. The four applications shipped after my internship ended. Knowing the work continued beyond my summer made the experience especially meaningful."], ["Beyond the Work", "Some of my favorite memories had little to do with a PRD or a sprint. Friday social hours, exploring the city with colleagues, and conversations outside formal meetings made the summer feel personal. I was surrounded by people who were generous with their time and perspectives, and those relationships made it easier to ask questions, learn, and grow. They are a big part of what I remember when I think about Ensora."], ["What I Took Away", "Ensora helped me understand why I am drawn to product management. I love the process of listening to people, figuring out what matters, and working with different teams to make an idea real. I also left with a deeper appreciation for building AI responsibly in healthcare: technology can be exciting, but its value comes from whether it meaningfully helps the person using it. More than anything, the summer taught me to start with people, stay curious, and take ownership of the work all the way through."]]},
 {"id": "prediction-guard", "name": "Prediction Guard", "role": "Undergraduate Data Scientist · Purdue The Data Mine", "period": "2025–2026", "category": "AI Security · Industry Partner Project", "intro": "What I learned by building vulnerable AI agents and testing how well safeguards stood up to real security risks.", "tags": ["Python", "APIs", "gpt-oss-120b", "OWASP Agentic Top 10", "Red Teaming", "LLM Evaluation"], "sections": [["The Beginning", "I joined Prediction Guard through Purdue's The Data Mine with a question I had not spent much time considering before: what happens when we give AI systems the ability to take actions, not just generate answers? As agentic AI became more capable, I wanted to understand the risks that could emerge when an agent interacts with tools, data, and other systems. Working on this research gave me the chance to look beyond what an AI assistant appears to do and investigate how it behaves under pressure."], ["Understanding the Risks", "Our research was guided by the OWASP Top 10 for Agentic Applications. I explored how threats such as prompt injection, misuse of personally identifiable information, memory poisoning, cascading failures, and rogue-agent behavior can affect AI systems. What interested me was that these risks were not limited to a single industry. An agent helping with a healthcare task, a financial workflow, or a retail interaction could each encounter different versions of the same underlying security problem."], ["Building the Agents", "I built and tested ten intentionally vulnerable AI agents across healthcare, finance, and retail scenarios. Each scenario gave us a controlled way to explore a particular type of risk. I worked with Python, APIs, and language models to set up agent behavior and design adversarial interactions. Building the agents myself made the research especially valuable: I could see how seemingly small decisions about instructions, tools, and access could change what an agent was capable of doing."], ["Developing the Evaluation Framework", "We needed a consistent way to compare how agents behaved when exposed to attacks. I helped develop a standardized testing approach that ran adversarial scenarios and examined outcomes with and without Prediction Guard's governance safeguards. This meant thinking carefully about what counted as an attack attempt, what a blocked outcome looked like, and how to compare results across very different agent behaviors. The goal was not simply to make an agent fail, but to learn which protections helped and where gaps remained."], ["Analyzing the Results", "Across the scenarios we tested, Prediction Guard's safeguards blocked approximately 77% of the attacks. That figure reflects the specific agents, attack scenarios, and evaluation conditions in our research; it is not a universal security guarantee. Looking at the outcomes was just as important as calculating the rate. We examined where safeguards worked, where agents remained vulnerable, and what those patterns might suggest for improving AI governance. The work helped connect hands-on testing to questions that engineering teams could act on."], ["Sharing Our Research", "We presented our findings at Purdue's Data Mine Corporate Partners Symposium, where I had the opportunity to explain our approach and results through a research poster. We also shared our findings with Prediction Guard's engineering team and CEO. One of the most rewarding parts of the project was helping communicate technical security risks in a way that connected to practical decisions about building safer AI systems. I also co-authored a public article about what we learned from testing against the OWASP Top 10."], ["The People Behind the Research", "Research is often described through models, experiments, and results, but I also remember the people behind this project. Collaborating with teammates, discussing unexpected outcomes, and preparing to present our work made the experience much richer. It taught me how important it is to challenge one another's assumptions and explain complex ideas clearly, especially when the work sits at the intersection of research and a real product."], ["What I Took Away", "This experience changed how I think about AI in everyday life. I still find AI exciting, but I now catch myself wondering what is happening behind the interface: what instructions an agent follows, what information it can access, how it might be manipulated, and what safeguards make it trustworthy. Rather than making me less interested in AI, the research made me more curious and more thoughtful about the responsibility that comes with building it. I want to keep asking not only what AI can do, but what it should be trusted to do."]], "link": "https://predictionguard.com/blog/red-teaming-agentic-ai-findings-from-testing-prediction-guard-against-the-owasp-top-10", "linkText": "Read our published article ↗"},
 {"id": "agreliant", "name": "AgReliant Genetics", "role": "Data Science Research Project · Purdue The Data Mine", "period": "Spring 2025", "category": "Data Science · Industry Partner Project", "intro": "Connecting customer segmentation and predictive modeling to decisions that matter for sales and marketing.", "tags": ["Python", "SQL", "BIRCH", "Random Forest", "Gradient Boosting", "LightGBM", "Tableau"], "sections": [["The Beginning", "My work with AgReliant Genetics through Purdue's The Data Mine gave me the chance to explore a question that sits between data science and business strategy: how can information about customers help a team make smarter decisions? I was interested in the entire process, from messy raw data to a finding that someone outside the technical team could actually use."], ["Understanding the Business Problem", "The project focused on better understanding customers and purchasing patterns to support sales and marketing decisions. We weren't looking for a model just to say we'd built one. We wanted to identify meaningful groups of customers, explore patterns in their behavior, and consider how predictive analysis might help inform future decisions."], ["Preparing the Data", "Before any modeling could begin, I worked with customer demographics, purchasing history, and external market intelligence. Using Python and SQL, I helped clean, combine, and prepare data from different sources. This stage was a reminder that analytical results depend heavily on the quality and consistency of the information behind them."], ["Finding Customer Segments", "I used BIRCH clustering to explore natural groupings in the customer data. Our analysis identified three customer segments, with a silhouette score of approximately 0.60. The interesting part wasn't simply arriving at three groups. It was thinking about what distinguished them and how those differences could be communicated to people making business decisions."], ["Predicting Customer Behavior", "Alongside segmentation, I also worked on predictive modeling. We experimented with Random Forest, Gradient Boosting, and LightGBM to investigate customer patterns and potential outcomes. In our experiments, the Random Forest model achieved approximately 65% accuracy. Comparing approaches helped me think more critically about what a metric can tell us, what it cannot, and why model performance has to be understood in context."], ["Turning Models Into Business Insights", "I worked with visualizations and dashboards, including Tableau, to make our findings easier to explore. A cluster label or model prediction does not mean much on its own to a sales or marketing team. We needed to connect the results to customer characteristics, purchasing behavior, and geographic patterns so that the analysis could support practical conversations."], ["Presenting Our Research", "We brought the work together in a research poster, communicating the business question, our data preparation, the clustering and predictive approaches, and what we learned. Presenting the project pushed me to explain technical choices clearly without assuming everyone shared the same data science background. The original poster will be featured here."], ["What I Took Away", "AgReliant showed me that I enjoy more than building models. I enjoy finding the question behind the data, making sense of complicated information, and translating technical work into something useful for a team. I left with a stronger appreciation for the bridge between analytics and product or business decisions. A model is part of the story; the value comes from what people can understand and do with it."]]}];
const projects=[{"id": "snap-study", "name": "Snap Study", "role": "AI-powered accessible learning companion", "category": "HealthTech · AI · Education · Accessibility", "period": "2025", "intro": "Making learning materials more accessible through simplified explanations, audio, and a friendly study companion.", "tags": ["Accessibility", "Flutter", "FastAPI", "Python", "AWS Bedrock", "Textract", "Polly", "S3"], "sections": [["The Inspiration", "Snap Study grew out of our team's conversations about how traditional study materials can be difficult to navigate for students with different learning needs. A teammate shared the experience of a friend with ADHD, and it helped us think about the small but meaningful barriers that can turn an ordinary study session into something frustrating."], ["The Problem We Wanted to Solve", "Textbooks, lecture slides, handwritten notes, and PDFs can contain a lot of information without making the most important ideas easy to find. For students who experience ADHD, dyslexia, or other literacy-related challenges, the format itself can add to the effort of learning. We wanted to explore how AI could help make that material easier to approach."], ["Meet Tobi the Tutor Bear", "We designed Snap Study around a friendly companion, Tobi the Tutor Bear, to make the experience feel more welcoming. The idea was to give students a place to bring their study materials and receive simpler explanations, highlighted concepts, audio narration, and conversational support without losing sight of the original learning goal."], ["How the Experience Works", "The project explores a flow where students upload learning materials, receive AI-assisted explanations and summaries, listen to content, and revisit saved lessons. Adjustable text presentation and preferences support different ways of learning. We focused on accessibility as part of the experience, rather than treating it as a feature added at the end."], ["Behind the Technology", "The prototype used Flutter for the application experience, FastAPI and Python for backend services, and AWS tools including Textract, Bedrock with Claude 3.5 Sonnet, Polly, and S3. Those services helped us experiment with extracting content, generating explanations, storing materials, and creating audio narration."], ["Challenges and Tradeoffs", "One challenge was deciding how much to simplify material without losing important meaning. We also explored prompt tuning, model behavior, visual presentation, and the complexity of keeping the experience consistent as students moved between different materials and learning modes. These were product questions as much as technical ones."], ["What I Took Away", "Snap Study reinforced my belief that accessibility should influence a product from the beginning. The project also reminded me that a powerful AI feature isn't automatically a good learning experience. Clarity, trust, and the needs of the student have to guide the design."]], "link": "https://devpost.com/software/snap-study-with-tobi-ai?ref_content=my-projects-tab&ref_feature=my_projects", "linkText": "Explore Snap Study on Devpost ↗"}];

/* ------------------------------------------------------------------
   Everything above this line is Anvesha's content, unchanged.
   Below: layout, navigation and interaction.
------------------------------------------------------------------- */
const app=document.getElementById('app');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover=window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const svg=(body,vb='0 0 24 24')=>`<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
const icons={
 cup:svg('<path d="M4 10h13v4.5A5.5 5.5 0 0 1 11.5 20h-2A5.5 5.5 0 0 1 4 14.5V10Z"/><path d="M17 11.5h1.2a2.3 2.3 0 0 1 0 4.6H16.6"/><path d="M3 22h16"/><path d="M9 3.5c-.9 1 .9 1.8 0 3M12.5 3c-.9 1 .9 1.8 0 3"/>'),
 up:svg('<path d="M12 19V5M6 11l6-6 6 6"/>'),
 left:svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
 right:svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
 bean:svg('<ellipse cx="12" cy="12" rx="5.6" ry="8.4" transform="rotate(28 12 12)"/><path d="M9.6 5.6c2.6 2.2-.4 5.6 1.4 7.6 1.2 1.4 3.2 2 2.6 5.2"/>'),
 sun:svg('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>'),
 scissors:svg('<circle cx="6" cy="6.5" r="2.5"/><circle cx="6" cy="17.5" r="2.5"/><path d="M8.2 7.8 20 18M8.2 16.2 20 6"/>'),
 sparkle:svg('<path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z"/><path d="M18.5 16.5c.2 1.3.8 1.9 2 2-1.2.2-1.8.8-2 2-.2-1.2-.8-1.8-2-2 1.2-.1 1.8-.7 2-2Z"/>'),
 flower:svg('<circle cx="12" cy="12" r="2.4"/><path d="M12 9.6C10 6 10.6 3.5 12 3c1.4.5 2 3 0 6.6ZM12 14.4c2 3.6 1.4 6.1 0 6.6-1.4-.5-2-3 0-6.6ZM9.6 12C6 14 3.5 13.4 3 12c.5-1.4 3-2 6.6 0ZM14.4 12c3.6-2 6.1-1.4 6.6 0-.5 1.4-3 2-6.6 0Z"/>'),
 heart:svg('<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>'),
 image:svg('<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="m21 16-5-5-8.5 8.5"/>')
};

const navLinks=[['story','ABOUT'],['experience','EXPERIENCE'],['projects','PROJECTS'],['research','RESEARCH'],['campus','CAMPUS'],['contact','CONTACT']];
const heroLinks=navLinks.filter(([id])=>['story','experience','projects','contact'].includes(id));
const navBar=(page,links,extra='')=>`<header class="site-nav ${extra}"><a class="wordmark" href="#/menu">ANVESHA’S CAFÉ <span class="wordmark-rule" aria-hidden="true"></span></a><nav id="primary-nav" aria-label="Main navigation">${links.map(([id,label])=>`<a href="#/${id}"${page===id?' aria-current="page"':''}>${label}</a>`).join('')}<a class="cup-link" href="#/menu" aria-label="Café menu"${page==='menu'?' aria-current="page"':''}>${icons.cup}</a></nav><button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span></button></header>`;
const nav=(page)=>navBar(page,navLinks);
const footer=()=>`<footer class="footer"><div class="footer-top"><a class="footer-mark" href="#/menu">ANVESHA’S CAFÉ</a><nav class="footer-links" aria-label="Footer">${navLinks.map(([id,label])=>`<a href="#/${id}">${label}</a>`).join('')}</nav></div><div class="footer-bottom"><span>ANVESHA’S CAFÉ</span><span>Made with curiosity, care & a little coffee.</span><a href="#/menu">Back to the menu ↑</a></div></footer>`;
const chrome=()=>`<div class="read-progress" aria-hidden="true"><span></span></div><button class="to-top" type="button" aria-label="Back to top">${icons.up}</button>`;
const shell=(content,page)=>`<a class="skip-link" href="#main">Skip to content</a>${nav(page)}<main id="main" tabindex="-1">${content}</main>${chrome()}`;
const heading=(k,t,d='')=>`<div class="page-heading"><div class="eyebrow">${k}</div><h1>${t}</h1>${d?`<p>${d}</p>`:''}</div>`;
const section=(title,text,mark,i)=>`<section class="story-section"${i!==undefined?` id="ch-${i}"`:''}><span class="section-dot" aria-hidden="true">${mark||icons.bean}</span><div><h2>${title}</h2><p>${text}</p></div></section>`;
const pad=(n)=>String(n).padStart(2,'0');
const arrowBtn=(cls='')=>`<span class="round-arrow ${cls}" aria-hidden="true">↗</span>`;

/* "Up next" carries a reader from one café section to the next, in menu order */
const researchMenuVisual=()=>`<div class="research-menu-visual" role="img" aria-label="HealthTech, artificial intelligence, and machine learning"><span>HEALTH TECH</span><strong>AI &amp;<br>Machine Learning</strong><small>Research · Ethics · Bioinformatics</small></div>`;
const upNext=(id)=>{const i=menu.findIndex(m=>m.id===id),n=menu[i+1];if(i<0||!n)return'';return `<a class="up-next tilt" href="#/${n.id}"><div class="up-next-copy"><span class="up-next-label">Up next <i>${pad(i+2)}</i></span><h2>${n.name}</h2><p>${n.description}</p></div><div class="up-next-media">${n.id==='research'?researchMenuVisual():`<img src="${A+n.image}" alt="" loading="lazy">`}</div>${arrowBtn()}</a>`;};

/* placeholders: same wording as before, kept with the section they follow */
const slot=(cls,label,span,strong,small)=>`<div class="ensora-photo-slot ${cls}" role="img" aria-label="${label}"><i aria-hidden="true">${icons.image}</i><span>${span}</span><strong>${strong}</strong><small>${small}</small></div>`;
function photoSlot(file,alt,caption){return `<figure class="portfolio-photo"><img src="${A+file}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;}
function slotsFor(id,i){
 if(id==='ensora'&&i===2)return photoSlot('ensora-team.png','Ensora Health team group photo','The ENSAI team at Ensora Health');
 if(id==='ensora'&&i===6)return photoSlot('ensora-meeting.jpg','Ensora Health team meeting on Microsoft Teams','Connecting with the team');
 if(id==='ensora'&&i===7)return photoSlot('ensai-beyond.jpg','Interns and colleagues at the Orlando onboarding meetup','Summer intern onboarding meetup · Orlando, Florida');
 if(id==='prediction-guard'&&i===5)return photoSlot('prediction-guard-poster.png','Prediction Guard red-teaming research symposium poster','Our research poster · 2026')+`<a class="text-link" href="${A}prediction-guard-poster.pdf" target="_blank" rel="noopener noreferrer">View full research poster ↗</a>`;
 if(id==='prediction-guard'&&i===6)return photoSlot('prediction-guard-office.png','Team gathering in the Prediction Guard office','A moment with the team');
 if(id==='agreliant'&&i===6)return photoSlot('agreliant-poster.png','AgReliant Genetics customer segmentation and prediction research poster','Our research poster · 2025')+`<a class="text-link" href="${A}agreliant-poster.pdf" target="_blank" rel="noopener noreferrer">View full research poster ↗</a>`;
 if(id==='snap-study'&&i===2)return photoSlot('tobi.png','Tobi the Tutor Bear, the Snap Study learning companion','Meet Tobi the Tutor Bear').replace('class="portfolio-photo"','class="portfolio-photo tobi-portrait"');
 if(id==='snap-study'&&i===3)return `<div class="video-walkthrough"><span class="eyebrow">SNAP STUDY · PRODUCT WALKTHROUGH</span><h3>See the learning experience in action</h3><p>Watch the full flow, from study materials to AI-assisted learning.</p><a class="outline-button" href="https://www.youtube.com/watch?v=6THwhBVxuzc" target="_blank" rel="noopener noreferrer">Watch the walkthrough on YouTube ↗</a></div>`;
 return '';
}
const noteFor=(id)=>id==='ensora'?'Personal team photos from my time at Ensora Health.':id==='prediction-guard'?'Research poster and team photo from this project.':id==='agreliant'?'Original research poster from The Data Mine Corporate Partners Symposium.':'Project screenshots can be added once available.';

/* stories read in one continuous line: all experiences, then all projects */
const sequence=[...experiences.map(x=>({type:'experience',x})),...projects.map(x=>({type:'projects',x}))];
function pager(type,id){
 const i=sequence.findIndex(s=>s.type===type&&s.x.id===id),p=sequence[i-1],n=sequence[i+1];
 const card=(s,dir)=>`<a class="pager-card ${dir} tilt" href="#/${s.type}/${s.x.id}"><span class="pager-dir">${dir==='prev'?icons.left+' Previous':'Next '+icons.right}</span><span class="eyebrow">${s.x.category||s.x.role}</span><strong>${s.x.name}</strong></a>`;
 return `<nav class="pager" aria-label="More stories">${p?card(p,'prev'):'<span class="pager-spacer"></span>'}${n?card(n,'next'):`<a class="pager-card next tilt" href="#/research"><span class="pager-dir">Next ${icons.right}</span><span class="eyebrow">${menu[2].description}</span><strong>${menu[2].name}</strong></a>`}</nav>`;
}

/* ---------------- pages ---------------- */
function landing(){
 app.innerHTML=`<main class="landing landing-clean" id="main" tabindex="-1">
  ${navBar('',navLinks,'on-hero')}
  <div class="clean-scene" aria-hidden="true"></div>
  <section class="clean-copy" aria-label="Welcome to Anvesha's Café">
   <div class="clean-kicker">WELCOME TO</div>
   <h1>Anvesha’s<br>Café</h1>
   <div class="clean-rule" aria-hidden="true"></div>
   <p>A space where AI, product thinking, research and people come together. I’m Anvesha, and I’m so glad you’re here.</p>
   <a class="clean-button" href="#/menu">LET’S EXPLORE MY CAFÉ <span aria-hidden="true">→</span></a>
  </section>
 </main>`;
}
function cafeMenu(){
 app.innerHTML=shell(`<div class="menu-wrap"><div class="heading-stage"><div class="beans-stage" id="beans-stage" aria-hidden="true"></div>${heading('ANVESHA’S CAFÉ','The Café Menu','Take a look around. There’s a little bit of everything brewing here.')}</div><div class="menu-grid">${menu.map((m,i)=>`<a href="#/${m.id}" class="menu-card tilt" style="--i:${i}"><div class="menu-media">${m.id==='research'?researchMenuVisual():`<img src="${A+m.image}" alt="" loading="lazy">`}</div><div class="menu-number">0${i+1}</div><h2>${m.name}</h2><p>${m.description}</p>${arrowBtn()}</a>`).join('')}</div></div>`,'menu');
}
function listing(type){
 const isWork=type==='experience',arr=isWork?experiences:projects;
 app.innerHTML=shell(`<div class="content-wrap">${heading(isWork?'THE WORK':'FRESHLY BREWED',isWork?'Work Experience':'Projects',isWork?'A collection of experiences where I learned to connect technology with real human needs.':'Ideas I care about, built with curiosity and a willingness to experiment.')}<div class="feature-list">${arr.map((x,i)=>`<a class="feature-card tilt tilt-soft" href="#/${type}/${x.id}" style="--i:${i}"><div class="feature-index">0${i+1} / ${x.period||'PROJECT'}</div><div class="feature-main"><div><div class="eyebrow">${x.category||x.role}</div><h2>${x.name}</h2><p class="role">${x.role}</p><p>${x.intro}</p><div class="tags">${x.tags.map(t=>`<span>${t}</span>`).join('')}</div></div><span class="feature-cta">${isWork?'Read my story':'Explore the project'} <b>↗</b></span></div></a>`).join('')}</div>${upNext(type)}</div>`,type);
}
const skillDetails={
 ensora:{tech:'Python · Streamlit · LLM-as-a-Judge · Agentic AI · LLM evaluation frameworks · Azure DevOps',pm:'User interviews · Product discovery · Requirements gathering · PRDs · User stories · Backlog prioritization · Cross-functional collaboration · Sprint planning · Stakeholder communication',applied:'Led the development of four agentic AI applications from discovery and requirements through launch readiness; evaluated model behavior and communicated decisions to engineering and leadership.'},
 'prediction-guard':{tech:'Python · APIs · gpt-oss-120b · OWASP Agentic AI Top 10 · Adversarial testing · LLM evaluation',pm:'Research scoping · Adversarial test design · Risk assessment · Evaluation metrics · Engineering collaboration · Technical presentations',applied:'Built and tested ten vulnerable agents, compared attack outcomes with safeguards, and presented the results to technical and business stakeholders.'},
 agreliant:{tech:'Python · SQL · pandas · scikit-learn · BIRCH · Random Forest · Gradient Boosting · LightGBM · Tableau',pm:'Business requirements analysis · Customer segmentation · Predictive analytics · Model comparison · Data storytelling · Stakeholder dashboards',applied:'Prepared customer data, modeled segments and purchasing patterns, and translated findings into visual insights for sales and marketing.'},
 'snap-study':{tech:'Flutter · Python · FastAPI · AWS Textract · Amazon Bedrock (Claude 3.5 Sonnet) · Amazon Polly · Amazon S3',pm:'Accessibility-first product design · User problem definition · Feature prioritization · UX prototyping · AI product tradeoffs',applied:'Designed an accessible study flow and prototyped AI-powered content extraction, explanation, and audio narration.'}
};
const skillsPanel=id=>{const s=skillDetails[id];return s?`<section class="skills-deep-dive"><h2>Skills & tools in practice</h2><div class="skills-line"><h3>Tech stack</h3><p>${s.tech}</p></div><div class="skills-line"><h3>Product & collaboration</h3><p>${s.pm}</p></div><div class="skills-line"><h3>How I used them</h3><p>${s.applied}</p></div></section>`:'';};

function detail(type,id){
 const data=(type==='experience'?experiences:projects).find(x=>x.id===id);
 if(!data){location.hash='#/'+type;return;}
 const rail=`<aside class="chapter-rail" aria-label="Chapters"><p class="rail-title">Chapters</p><ol>${data.sections.map(([t],i)=>`<li><button type="button" data-target="ch-${i}"><span>${pad(i+1)}</span>${t}</button></li>`).join('')}</ol></aside>`;
 app.innerHTML=shell(`<article class="detail-page">
  <div class="content-wrap detail-top"><a class="back-link" href="#/${type}">← Back to ${type==='experience'?'work experience':'projects'}</a>
   <div class="detail-head"><div class="eyebrow">${data.category||data.role}</div><h1>${data.name}</h1><p class="detail-intro">${data.intro}</p><div class="detail-meta"><span>${data.role}</span>${data.period?`<span>${data.period}</span>`:''}</div><div class="tags">${data.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>
  </div>
  <div class="content-wrap detail-layout">${rail}<div class="detail-body">${skillsPanel(data.id)}${data.sections.map(([t,v],i)=>section(t,v,`<b>${pad(i+1)}</b>`,i)+slotsFor(data.id,i)).join('')}${data.link?`<a class="text-link" href="${data.link}" target="_blank" rel="noopener noreferrer">${data.linkText}</a>`:''}

   ${pager(type,id)}
   <a class="next-link" href="#/${type}">← Explore more ${type==='experience'?'experiences':'projects'}</a></div></div>
 </article>`,type);
 document.body.classList.add('is-reading');
}

function research(){
  app.innerHTML=shell(`
    <div class="content-wrap">
      ${heading(
        'THE LAB',
        'Driven by Curiosity.',
        'Exploring how technology intersects with science, society, and the people it affects.'
      )}

      <div class="research-entry">
        <div class="research-illustration tilt">
          <div class="watch-scene">
            <div class="watch">
              <span class="watch-heart">${icons.heart}</span>
              <span>72</span>
              <small>BPM</small>
              <svg class="ecg" viewBox="0 0 120 24" aria-hidden="true">
                <path d="M0 12h38l5-9 6 18 5-14 4 5h62"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <div class="eyebrow">01 / FALL 2026 · IN PROGRESS</div>
          <h2>Wearable Health Data, Insurance & Consumer Privacy</h2>
          <div class="role">Academic Research · Data Science Ethics · Purdue University</div>
          <p>I'm currently investigating the ethical implications of insurance companies collecting and using data generated by smartwatches and fitness trackers, especially where HIPAA protections may not apply.</p>
          <blockquote>Should insurance companies be allowed to collect and use wearable health data when that information may fall outside HIPAA protections, and what ethical and regulatory safeguards are needed to protect consumers?</blockquote>
          <div class="tags">
            <span>Health Data Privacy</span>
            <span>Data Ethics</span>
            <span>HIPAA</span>
            <span>Consumer Protection</span>
          </div>
        </div>
      </div>

      ${upNext('research')}
    </div>
  `,'research');
}
function story(){app.innerHTML=shell(`<div class="content-wrap story-page">${heading('THE STORY','A Little About Me','The person behind the projects, the research, and the coffee.')}<div class="story-hero"><div class="story-photo-placeholder tilt"><img src="${A}portrait.jpg" alt="Anvesha enjoying an evening in the city" loading="lazy"></div><div><div class="eyebrow">HELLO, I'M ANVESHA</div><h2>Curious about people. Excited by possibility.</h2><p>I'm a Computer Science student at Purdue University, drawn to the intersection of artificial intelligence, product thinking, and the human experiences behind technology.</p><p>My path has taken me from deep learning research and AI security to product development in healthcare. The common thread is curiosity: I like asking questions, listening carefully, and figuring out how an idea could make someone's experience better.</p><p>I love the moment when a technical possibility starts to feel like a real product, especially when it comes from understanding the people who will use it.</p></div></div>${section('What Drives Me',"I’m interested in what happens before a solution exists: the questions, conversations, experiments, and decisions that help a team understand what matters. At Ensora, that meant listening to therapists before defining AI features. In research, it has meant investigating how models behave, what the data is really saying, and where technology needs more care. I enjoy bringing those perspectives together.")}${section('Beyond the Screen',"Outside of classes, projects, and work, I love the little things that make a day feel memorable. I enjoy cooking, especially experimenting with different kinds of pasta, finding a good sunset, watching Bollywood movies or Grey’s Anatomy, and spending time with my family and people I care about. Those interests keep me creative, curious, and connected to the world beyond a laptop.")}<div class="photo-grid"><div class="tilt"><img src="${A}sunset.jpg" alt="A warm orange sunset" loading="lazy"><span class="photo-caption">Sunsets</span></div><div class="tilt"><img src="${A}pasta.jpg" alt="Homemade pasta" loading="lazy"><span class="photo-caption">Cooking, especially pasta</span></div><div class="tilt"><img src="${A}family.jpg" alt="Anvesha with her family at Purdue University" loading="lazy"><span class="photo-caption">Family</span></div></div>${section('A Little More About Me',"I don’t think there is one neat label for the kind of work I want to do. I like AI and technical problem-solving, but I also love the human side of building things: understanding a need, collaborating across perspectives, and telling a clear story about why something matters. This café is my way of bringing all those sides of me into one place.")}<div class="closing"><p>Thanks for stopping by my little corner of the internet.</p><a class="primary-button" href="#/experience">See what I've been working on <span class="btn-arrow">→</span></a></div>${upNext('story')}</div>`,'story')}
function campus(){app.innerHTML=shell(`<div class="content-wrap">${heading('AROUND THE TABLE','Campus Involvement','The experiences that taught me how much community, care, and collaboration matter.')}<div class="campus-grid"><article class="campus-card"><div class="campus-media tilt"><img src="${A}purdue-clocktower.png" alt="Purdue bell tower with spring blossoms"/></div><div class="eyebrow">PURDUE UNIVERSITY · HILLENBRAND HALL</div><h2>Resident Assistant</h2><p>Being a Resident Assistant has shown me that community doesn't happen automatically. It grows through the small moments when someone feels welcomed, heard, or included. I support residents, help them navigate challenges, and plan opportunities for people on my floor to connect.</p><p>From board game nights and casual conversations to shared snacks and seasonal activities, I enjoy thinking about how to make the residence hall feel a little more like home. The role has taught me to lead with empathy, stay calm when plans change, and pay attention to the people around me.</p><div class="tags"><span>Community Building</span><span>Mentorship</span><span>Leadership</span></div><figure class="campus-board-photo"><img src="${A}ra-board.jpg" alt="Anvesha’s Meet Your RA bulletin board" loading="lazy"><figcaption>My Meet Your RA board</figcaption></figure></article><article class="campus-card"><div class="campus-media tilt"><img src="${A}work.jpg" alt="Warm desk and workspace"/></div><div class="eyebrow">PURDUE UNIVERSITY · UNIVERSITY RESIDENCES</div><h2>Student Office Staff</h2><p>At the residence hall front desk, I've learned how much the little interactions matter. My work includes assisting residents and visitors, supporting daily operations, communicating with staff, and helping resolve the everyday questions that come up in a busy campus community.</p><p>It has strengthened my communication and problem-solving skills, but it's also made me more attentive to how people experience a service. Sometimes being helpful means knowing the answer; other times it means listening, following through, and making someone feel comfortable asking.</p><div class="tags"><span>Communication</span><span>Operations</span><span>Student Support</span></div></article></div><div class="closing"><p>Leadership, to me, is as much about showing up for people as it is about taking initiative.</p></div>${upNext('campus')}</div>`,'campus')}
function contact(){app.innerHTML=shell(`<div class="contact-page"><div class="contact-ornament" id="cup-stage"><span class="cup-fallback">${icons.cup}</span></div><div class="eyebrow">COFFEE CHAT</div><h1>Let's grab a coffee.</h1><p>Whether it's about AI, product ideas, research, opportunities, or just an interesting conversation, I'd love to connect.</p><div class="contact-actions"><a class="primary-button" href="https://www.linkedin.com/in/anvesha-nain-a14033223/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn ↗</a><a class="outline-button" href="#/menu">Explore the café <span class="btn-arrow">→</span></a></div><p class="contact-note">Email me at <a href="mailto:nain.anvesha4@gmail.com">nain.anvesha4@gmail.com</a></p></div>`,'contact')}

/* ---------------- behaviour ---------------- */
let cleanups=[];
function addCleanup(fn){if(typeof fn==='function')cleanups.push(fn);}
function teardown(){cleanups.forEach(fn=>{try{fn()}catch(e){}});cleanups=[];document.body.classList.remove('nav-open','is-reading','nav-hidden','scrolled');}

function mountScenes(page){
 const S=window.CafeScene;
 const has3d=!!(S&&S.supported);
 document.documentElement.classList.toggle('no-3d',!has3d);
 if(!has3d)return;
 if(!page){const el=document.getElementById('hero-stage');if(el)addCleanup(S.hero(el,document.getElementById('hero-labels')));}
 if(page==='menu'){const el=document.getElementById('beans-stage');if(el)addCleanup(S.beans(el));}
 if(page==='contact'){const el=document.getElementById('cup-stage');if(el){el.classList.add('has-3d');addCleanup(S.cup(el));}}
}

function mountTilt(){
 if(!canHover||reduceMotion)return;
 document.querySelectorAll('.tilt').forEach(el=>{
  const soft=el.classList.contains('tilt-soft'),max=soft?3:7;
  let raf=0;
  const move=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
   cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{el.style.setProperty('--rx',((0.5-y)*max).toFixed(2)+'deg');el.style.setProperty('--ry',((x-0.5)*max).toFixed(2)+'deg');el.style.setProperty('--gx',(x*100).toFixed(1)+'%');el.style.setProperty('--gy',(y*100).toFixed(1)+'%');});};
  const enter=()=>el.classList.add('tilting');
  const leave=()=>{cancelAnimationFrame(raf);el.classList.remove('tilting');el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');};
  el.addEventListener('pointerenter',enter);el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
 });
}

function mountChapters(){
 const buttons=[...document.querySelectorAll('.chapter-rail button')];
 if(!buttons.length)return;
 buttons.forEach(b=>b.addEventListener('click',()=>{const t=document.getElementById(b.dataset.target);if(t){t.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});const h=t.querySelector('h2');if(h){h.setAttribute('tabindex','-1');h.focus({preventScroll:true});}}}));
 const targets=buttons.map(b=>document.getElementById(b.dataset.target));
 const io=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){const i=targets.indexOf(en.target);buttons.forEach((b,j)=>b.classList.toggle('active',j===i));}});},{rootMargin:'-35% 0px -55% 0px'});
 targets.forEach(t=>t&&io.observe(t));
 addCleanup(()=>io.disconnect());
}

let lastY=0;
function onScroll(){
 const y=window.scrollY,doc=document.documentElement;
 document.body.classList.toggle('scrolled',y>12);
 document.body.classList.toggle('show-top',y>700);
 if(!document.body.classList.contains('nav-open'))document.body.classList.toggle('nav-hidden',y>260&&y>lastY+4);
 if(y<lastY-4)document.body.classList.remove('nav-hidden');
 lastY=y;
 const bar=document.querySelector('.read-progress span');
 if(bar&&document.body.classList.contains('is-reading')){const max=doc.scrollHeight-window.innerHeight;bar.style.transform=`scaleX(${max>0?Math.min(1,y/max):0})`;}
}
window.addEventListener('scroll',onScroll,{passive:true});

function setNav(open){
 document.body.classList.toggle('nav-open',open);
 const t=document.querySelector('.mobile-toggle');
 if(t){t.setAttribute('aria-expanded',String(open));t.setAttribute('aria-label',open?'Close navigation':'Open navigation');}
}
document.addEventListener('click',e=>{
 if(e.target.closest('.mobile-toggle')){setNav(!document.body.classList.contains('nav-open'));return;}
 if(e.target.closest('.to-top')){window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'});return;}
 const skip=e.target.closest('.skip-link');
 if(skip){e.preventDefault();const m=document.getElementById('main');if(m)m.focus();}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('nav-open'))setNav(false);});

const titles={experience:'Work Experience',projects:'Projects',research:'Research',campus:'Campus Involvement',story:'The Story',contact:'Coffee Chat'};
let firstRender=true;
function render(){
 teardown();
 let [page,id]=location.hash.replace(/^#\/?/,'').split('/');
 switch(page){case 'menu':cafeMenu();break;case 'experience':id?detail(page,id):listing(page);break;case 'projects':id?detail(page,id):listing(page);break;case 'research':research();break;case 'campus':campus();break;case 'story':story();break;case 'contact':contact();break;default:page='';landing();}
 window.scrollTo(0,0);lastY=0;
 const known=page&&page!=='menu';
 let name=known?(titles[page]||page):'';
 if(id){const d=[...experiences,...projects].find(x=>x.id===id);if(d)name=d.name;}
 document.title=(name?`${name} | `:'')+"Anvesha's Café";
 document.body.dataset.page=page||'home';
 mountScenes(page);mountTilt();mountChapters();onScroll();
 if(!firstRender){const m=document.getElementById('main');if(m)m.focus({preventScroll:true});}
 firstRender=false;
}
function route(){
 if(!firstRender&&document.startViewTransition&&!reduceMotion){document.startViewTransition(render);}else render();
}
window.addEventListener('hashchange',route);route();
