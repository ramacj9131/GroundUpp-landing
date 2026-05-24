import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase } from './lib/supabase';
import './styles.css';

function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  async function submitWaitlist(e) {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('Enter a valid email address.');
      return;
    }

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        setStatus('You are already on the waitlist.');
      } else {
        setStatus('Something went wrong. Please try again.');
      }
      return;
    }

    setStatus('You have joined the GroundUpp waitlist.');
    setEmail('');
  }

  return (
    <div className="app">
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <div className="badge">
            Built for groundwork & construction teams
          </div>

          <h1>
            Construction management,
            rebuilt from the ground up.
          </h1>

          <p>
            GroundUpp helps construction teams manage jobs,
            labour, progress, scheduling and communication —
            without bloated enterprise software.
          </p>

          <form onSubmit={submitWaitlist} className="waitlist-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              Join Waitlist
            </button>
          </form>

          {status && (
            <p className="status">
              {status}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
