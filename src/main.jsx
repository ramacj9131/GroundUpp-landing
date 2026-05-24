import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, Clock3, FileText, HardHat, Layers3, Mail, ShieldCheck, Sparkles, Truck, Users, Wrench } from 'lucide-react';
import { supabase } from './lib/supabase';
import './styles.css';

const features = [
  { icon: HardHat, title: 'Built for site teams', text: 'Simple worker flows for logging hours, reporting issues and checking assigned jobs without office-software clutter.' },
  { icon: Layers3, title: 'Jobs, labour and kit in one place', text: 'Track active jobs, time logs, materials, equipment issues, site diaries and documents from one clear dashboard.' },
  { icon: Sparkles, title: 'AI that actually helps', text: 'Spot job risks, labour overruns, material shortages and document needs before they become expensive problems.' },
  { icon: FileText, title: 'RAMS and site paperwork', text: 'Generate polished site documents, reports, site logs and export packs without starting from a blank page.' },
];

const modules = ['Job tracking', 'Worker time logs', 'Inventory alerts', 'Fleet issues', 'Daily site diary', 'AI summaries', 'CIS records', 'Applications for payment'];

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function submitWaitlist(e) {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('Enter a valid email and we’ll add you to the early access list.');
      return;
    }

    setLoading(true);
    setStatus('');

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        setStatus('You’re already on the GroundUpp waitlist.');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
      setLoading(false);
      return;
    }

    setStatus('You’re on the GroundUpp waitlist. We’ll be in touch soon.');
    setEmail('');
    setLoading(false);
  }

  return (
    <main>
      <div className="noise" />

      <header className="nav">
        <a className="brand" href="#top" aria-label="GroundUpp home">
          <span className="mark">GU</span>
          <span>GroundUpp</span>
        </a>

        <nav>
          <a href="#platform">Platform</a>
          <a href="#workers">For site teams</a>
          <a href="#waitlist">Waitlist</a>
        </nav>

        <a className="navCta" href="#waitlist">Join waitlist</a>
      </header>

      <section id="top" className="hero section">
        <div className="heroCopy reveal">
          <div className="eyebrow">
            <HardHat size={16} /> Built for UK construction businesses
          </div>

          <h1>Construction management from the ground up.</h1>

          <p className="lead">
            GroundUpp is a sleek, AI-powered operating system for contractors,
            groundworkers and site teams who need jobs, labour, materials,
            equipment and paperwork under control.
          </p>

          <div className="heroActions">
            <a className="primary" href="#waitlist">
              Join early access <ArrowRight size={18} />
            </a>

            <a className="secondary" href="#platform">
              See what’s coming
            </a>
          </div>

          <div className="trustRow">
            <span><Check size={16} /> Mobile-first for site</span>
            <span><Check size={16} /> Built around real workflows</span>
            <span><Check size={16} /> No bloated enterprise nonsense</span>
          </div>
        </div>

        <div className="productShell reveal delay">
          <div className="windowBar">
            <span></span><span></span><span></span>
          </div>

          <div className="dashHeader">
            <div>
              <p>Command Centre</p>
              <h3>Morning site briefing</h3>
            </div>
            <div className="score">87<span>/100</span></div>
          </div>

          <div className="alertCard hot">
            <div>
              <strong>Delay risk</strong>
              <p>Drainage run — labour tracking 18% above forecast.</p>
            </div>
            <span>High</span>
          </div>

          <div className="gridCards">
            <div><Clock3 /><b>142h</b><small>approved this week</small></div>
            <div><Truck /><b>3</b><small>fleet issues open</small></div>
            <div><Wrench /><b>6</b><small>materials below min</small></div>
            <div><Users /><b>24</b><small>crew on site today</small></div>
          </div>

          <div className="timeline">
            <span style={{ width: '78%' }}></span>
            <span style={{ width: '52%' }}></span>
            <span style={{ width: '34%' }}></span>
          </div>

          <div className="aiPanel">
            <Sparkles size={18} />
            <p>AI suggests moving two workers to Plot 14 tomorrow to protect Friday handover.</p>
          </div>
        </div>
      </section>

      <section id="platform" className="section split">
        <div>
          <p className="eyebrow amber">The platform</p>
          <h2>Less chasing. Less guessing. More control.</h2>
        </div>

        <p className="sectionText">
          GroundUpp is being designed for the reality of construction: wet sites,
          rushed mornings, changing labour, van problems, missing materials and
          paperwork that still needs to look professional.
        </p>
      </section>

      <section className="featureGrid section compact">
        {features.map((f) => (
          <article className="feature" key={f.title}>
            <f.icon />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </article>
        ))}
      </section>

      <section id="workers" className="section workerBlock">
        <div className="phoneMock">
          <div className="phoneTop"></div>
          <h3>Worker Home</h3>
          <button>Clock in</button>
          <div className="workerList">
            <span>Log hours</span>
            <span>My jobs</span>
            <span>Report issue</span>
          </div>
        </div>

        <div>
          <p className="eyebrow amber">For the lads on site</p>
          <h2>Powerful in the office. Simple on site.</h2>

          <p className="sectionText">
            Managers get the detail. Workers get big buttons, clear tasks and
            fast reporting. Nobody needs to fight through five menus to log a
            day’s work.
          </p>

          <div className="moduleList">
            {modules.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </section>

      <section className="section proof">
        <div className="proofCard">
          <ShieldCheck />
          <h3>Made for serious operators</h3>
          <p>
            Built for companies that have outgrown WhatsApp, spreadsheets and
            paper folders — but do not want clunky enterprise software.
          </p>
        </div>

        <div className="proofCard">
          <Sparkles />
          <h3>AI-native from day one</h3>
          <p>
            Not a chatbot bolted on the side. GroundUpp is planned around
            proactive summaries, risk flags and document generation.
          </p>
        </div>

        <div className="proofCard">
          <HardHat />
          <h3>Construction-first design</h3>
          <p>
            Dark, rugged, fast and practical. Premium enough for directors,
            simple enough for site teams.
          </p>
        </div>
      </section>

      <section id="waitlist" className="section waitlist">
        <div className="waitCard">
          <p className="eyebrow amber">
            <Mail size={16} /> Early access
          </p>

          <h2>Get on the GroundUpp waitlist.</h2>

          <p>
            Be first to see the demo, test the worker flows and help shape a
            construction platform built around real site problems.
          </p>

          <form onSubmit={submitWaitlist}>
            <input
              type="email"
              placeholder="Your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Joining...' : 'Join waitlist'} <ArrowRight size={18} />
            </button>
          </form>

          {status && <small className="status">{status}</small>}
        </div>
      </section>

      <footer>
        <div className="brand">
          <span className="mark">GU</span>
          <span>GroundUpp</span>
        </div>

        <p>© {new Date().getFullYear()} GroundUpp. Built for UK construction teams.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
