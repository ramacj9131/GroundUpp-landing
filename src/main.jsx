import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const joinWaitlist = async (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (error) {
      setMessage("Something went wrong.");
    } else {
      setMessage("You’re on the waitlist.");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <div className="page">
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <p className="tagline">
            Built for groundwork & construction teams
          </p>

          <h1>
            CONSTRUCTION
            <br />
            MANAGEMENT,
            <br />
            REBUILT FROM
            <br />
            THE GROUND UP.
          </h1>

          <p className="subtext">
            GroundUpp helps construction teams manage jobs, labour,
            progress, scheduling and communication — without bloated
            enterprise software.
          </p>

          <form className="waitlist-form" onSubmit={joinWaitlist}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Joining..." : "Join Waitlist"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h2>Job Tracking</h2>
          <p>
            Track projects, deadlines, crews and progress from one dashboard.
          </p>
        </div>

        <div className="feature">
          <h2>Labour Management</h2>
          <p>
            Manage workers, subcontractors and site attendance in real time.
          </p>
        </div>

        <div className="feature">
          <h2>Built For Site Teams</h2>
          <p>
            Simple, fast and practical software designed around real groundwork operations.
          </p>
        </div>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
