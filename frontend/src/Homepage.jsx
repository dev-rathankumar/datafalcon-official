import { useState } from "react";
import { Link } from "react-router-dom";
import { T } from "./theme";
import ParticleNet from "./components/ParticleNet";
import PageShell from "./components/PageShell";

// ── SERVICE CARD ─────────────────────────────────────────────────────────────
function SvcCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/services"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.card2 : T.card, padding: "1.6rem 1.4rem", cursor: "pointer", transition: "background 0.2s", textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "0.5px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "1rem", color: T.cyan }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.92rem", fontWeight: 600, marginBottom: 6, color: T.text }}>{title}</div>
      <div style={{ fontSize: "0.8rem", color: T.muted, lineHeight: 1.65, marginBottom: 10 }}>{desc}</div>
      <div style={{ fontSize: "0.72rem", color: T.cyan }}>Learn more →</div>
    </Link>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "⟡", title: "Agentic AI Systems",  desc: "Autonomous AI agents that reason, plan, and act — handling complex workflows without constant human input." },
  { icon: "◈", title: "Data Engineering",     desc: "Pipelines, warehouses, and dashboards that turn scattered data into clean, reliable business intelligence." },
  { icon: "◉", title: "Machine Learning",     desc: "Custom ML models — trained, tuned, and deployed into production systems that actually ship." },
  { icon: "⟳", title: "API & Automation",     desc: "Connect your tools, automate your ops, and build the infrastructure that scales without breaking." },
];

const WHY = [
  { n: "01", t: "Senior-only execution",        d: "Every project runs on experienced engineers. No juniors learning on your budget." },
  { n: "02", t: "Transparent from day one",     d: "Fixed-scope contracts, milestone-based payments, weekly updates. No surprises." },
  { n: "03", t: "India-based, globally fluent", d: "Cost-efficient without cutting corners — US-grade quality at a fraction of the cost." },
  { n: "04", t: "AI-native from the ground up", d: "We don't bolt AI onto old workflows. Intelligence is the architecture." },
];

const STATS = [
  { n: "50+",  l: "Global Clients" },
  { n: "250+", l: "Projects Delivered" },
  { n: "98%",  l: "Client Satisfaction" },
  { n: "20+",  l: "Countries Served" },
];

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function DatafalconHome() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="df-hero" style={{ position:"relative", overflow:"hidden", height:660, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <ParticleNet />
        {/* bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:100, background:`linear-gradient(transparent,${T.bg})`, pointerEvents:"none", zIndex:1 }} />

        <div className="df-hero-inner" style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", width:"100%" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"0.32rem 1rem", border:"0.5px solid rgba(0,212,255,0.25)", borderRadius:100, background:"rgba(0,212,255,0.05)", fontSize:"0.67rem", letterSpacing:"0.13em", textTransform:"uppercase", color:T.cyan, fontWeight:500, marginBottom:"1.5rem" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:T.cyan, display:"inline-block", animation:"blink 2s infinite" }} />
            AI Solutions. Data Solutions. Real Impact.
          </div>

          <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:"1.25rem", maxWidth:680 }}>
            Precision Intelligence.<br />
            <span style={{ color:T.cyan }}>Faster Decisions.</span><br />
            <span style={{ color:T.amber }}>Real Results.</span>
          </h1>

          <p style={{ fontSize:"0.92rem", color:T.muted, lineHeight:1.75, maxWidth:500, marginBottom:"2rem", fontWeight:300 }}>
            We build agentic AI systems and data solutions that give your business a sharper edge — engineered in India, deployed for the world.
          </p>

          <div className="df-hbtns" style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"center", marginBottom:"2.75rem" }}>
            <button style={{ background:T.cyan, border:"none", color:"#050a12", padding:"0.72rem 1.6rem", borderRadius:5, fontSize:"0.83rem", fontFamily:"Inter,sans-serif", fontWeight:600, cursor:"pointer" }}>
              Start a Project
            </button>
            <button style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.72rem 1.6rem", borderRadius:5, fontSize:"0.83rem", fontFamily:"Inter,sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=T.muted;e.currentTarget.style.color=T.text;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=T.dim;e.currentTarget.style.color=T.muted;}}>
              <span style={{ width:18, height:18, borderRadius:"50%", border:`0.5px solid ${T.dim}`, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>▶</span>
              See Our Work
            </button>
          </div>

          <div className="df-stats" style={{ display:"flex", border:`0.5px solid ${T.border}`, borderRadius:8, overflow:"hidden", maxWidth:680, width:"100%", background:T.surface }}>
            {STATS.map((s, i) => (
              <div key={s.l} className="df-stat" style={{ flex:1, padding:"1.2rem 1rem", textAlign:"center", borderRight: i < 3 ? `0.5px solid ${T.border}` : "none" }}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.55rem", fontWeight:700, color:T.cyan, letterSpacing:"-0.02em" }}>{s.n}</div>
                <div style={{ fontSize:"0.7rem", color:T.muted, marginTop:3, letterSpacing:"0.06em", textTransform:"uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height:"0.5px", background:T.border }} />

      {/* SERVICES */}
      <section className="df-sec" style={{ padding:"3.5rem 2rem", maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ fontSize:"0.68rem", letterSpacing:"0.16em", textTransform:"uppercase", color:T.amber, fontWeight:600, marginBottom:8 }}>What We Do</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:600, letterSpacing:"-0.025em", marginBottom:8 }}>Services built for the AI era</h2>
          <p style={{ color:T.muted, fontSize:"0.9rem", lineHeight:1.7, fontWeight:300 }}>From raw data to autonomous agents — we handle the full stack so your team doesn't have to.</p>
        </div>
        <div className="df-svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:1, background:T.border, border:`0.5px solid ${T.border}`, borderRadius:10, overflow:"hidden" }}>
          {SERVICES.map(s => <SvcCard key={s.title} {...s} />)}
        </div>
        <div style={{ textAlign:"center", marginTop:"1.75rem" }}>
          <Link to="/services" style={{ fontSize:"0.8rem", color:T.cyan, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
            View all services →
          </Link>
        </div>
      </section>

      <div style={{ height:"0.5px", background:T.border }} />

      {/* WHY */}
      <section className="df-sec" style={{ padding:"3.5rem 2rem", maxWidth:860, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ fontSize:"0.68rem", letterSpacing:"0.16em", textTransform:"uppercase", color:T.amber, fontWeight:600, marginBottom:8 }}>Why Datafalcon</div>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.4rem,2.5vw,1.9rem)", fontWeight:600, letterSpacing:"-0.025em", marginBottom:8 }}>Built lean. Wired for speed.</h2>
          <p style={{ color:T.muted, fontSize:"0.9rem", lineHeight:1.7, fontWeight:300 }}>A focused technical team — no layers of management, no inflated quotes. Just sharp execution.</p>
        </div>
        <div style={{ display:"grid", gap:10 }}>
          {WHY.map(w => (
            <div key={w.n} style={{ display:"flex", gap:14, padding:"1.2rem", border:`0.5px solid ${T.border}`, borderRadius:6, background:T.surface }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.7rem", fontWeight:700, color:T.cyan, letterSpacing:"0.1em", minWidth:28, paddingTop:2 }}>{w.n}</div>
              <div>
                <div style={{ fontSize:"0.9rem", fontWeight:500, marginBottom:4 }}>{w.t}</div>
                <div style={{ fontSize:"0.8rem", color:T.muted, lineHeight:1.6 }}>{w.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="df-cta" style={{ margin:"0 2rem 3rem", borderRadius:10, background:T.surface, border:`0.5px solid ${T.border}`, padding:"3rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:200, height:1, background:T.cyan, opacity:0.4 }} />
        <div style={{ fontSize:"0.68rem", letterSpacing:"0.16em", textTransform:"uppercase", color:T.amber, fontWeight:600, marginBottom:10 }}>Get Started</div>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.4rem,2.5vw,2rem)", fontWeight:600, letterSpacing:"-0.025em", marginBottom:8 }}>Ready to move faster?</h2>
        <p style={{ color:T.muted, fontSize:"0.9rem", marginBottom:"2rem" }}>Tell us what you're building. We'll respond within 48 hours with a clear plan.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button style={{ background:T.cyan, border:"none", color:"#050a12", padding:"0.75rem 1.75rem", borderRadius:5, fontSize:"0.85rem", fontFamily:"Inter,sans-serif", fontWeight:600, cursor:"pointer" }}>
            Book a Discovery Call
          </button>
          <button style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.75rem 1.75rem", borderRadius:5, fontSize:"0.85rem", fontFamily:"Inter,sans-serif", cursor:"pointer" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.muted;e.currentTarget.style.color=T.text;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.dim;e.currentTarget.style.color=T.muted;}}>
            hello@datafalcon.io
          </button>
        </div>
      </div>
    </PageShell>
  );
}
