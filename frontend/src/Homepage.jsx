import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { T } from "./theme";
import ParticleNet from "./components/ParticleNet";
import PageShell from "./components/PageShell";
import WhyDatafalcon from "./components/WhyDatafalcon";
import { EXPERTISE_AREAS } from "./data/expertiseAreas";

const TAGLINES = [
  "Building intelligent systems for forward-thinking businesses.",
  "Enabling AI and analytics with modern data platforms.",
  "Building the future of business through AI, data, and software.",
  "Engineering scalable software and AI systems for modern enterprises.",
];

function HeroTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TAGLINES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="df-hero-tagline-wrap"
      style={{
        maxWidth: 680,
        width: "100%",
        padding: 1,
        borderRadius: 8,
        background: "linear-gradient(135deg, rgba(0,212,255,0.55), rgba(245,166,35,0.35) 50%, rgba(180,220,255,0.3))",
        boxShadow: "0 0 6px rgba(0,212,255,0.22), 0 0 10px rgba(245,166,35,0.12)",
      }}
    >
      <div
        className="df-hero-tagline"
        style={{
          minHeight: 76,
          padding: "1.4rem 1.75rem",
          background: T.surface,
          borderRadius: 7,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              margin: 0,
              fontSize: "0.88rem",
              color: T.muted,
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: 560,
            }}
          >
            {TAGLINES[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── SERVICE CARD ─────────────────────────────────────────────────────────────
function SvcCard({ icon, title, desc, slug }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/our-expertise/${slug}`}
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
const SERVICES = EXPERTISE_AREAS.slice(0, 4).map((a) => ({
  icon: a.icon,
  title: a.title,
  desc: a.tagline,
  slug: a.slug,
}));

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function DatafalconHome() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="df-hero" style={{ position:"relative", overflow:"hidden", height:660, display:"flex", flexDirection:"column", alignItems:"center" }}>
        <ParticleNet />
        {/* bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:100, background:`linear-gradient(transparent,${T.bg})`, pointerEvents:"none", zIndex:1 }} />

        <div className="df-hero-inner" style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", width:"100%", padding:"2.5rem 2rem 0" }}>
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
            We build agentic AI systems and data solutions that give your business a sharper edge — designed for global impact.
          </p>

          <div className="df-hbtns" style={{ display:"flex", gap:12, alignItems:"center", justifyContent:"center", marginBottom:"2.75rem" }}>
            <Link to="/contact" style={{ background:T.cyan, border:"none", color:"#050a12", padding:"0.72rem 1.6rem", borderRadius:5, fontSize:"0.83rem", fontFamily:"Inter,sans-serif", fontWeight:600, cursor:"pointer", textDecoration:"none" }}>
              Start a Project
            </Link>
            <Link to="/our-work" style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.72rem 1.6rem", borderRadius:5, fontSize:"0.83rem", fontFamily:"Inter,sans-serif", cursor:"pointer", display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
              <span style={{ width:18, height:18, borderRadius:"50%", border:`0.5px solid ${T.dim}`, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>▶</span>
              See Our Work
            </Link>
          </div>

          <HeroTagline />
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
          <Link to="/our-expertise" style={{ fontSize:"0.8rem", color:T.cyan, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
            View our expertise →
          </Link>
        </div>
      </section>

      <div style={{ height:"0.5px", background:T.border }} />

      <WhyDatafalcon />

      {/* CTA */}
      <div className="df-cta" style={{ margin:"0 2rem 3rem", borderRadius:10, background:T.surface, border:`0.5px solid ${T.border}`, padding:"3rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:200, height:1, background:T.cyan, opacity:0.4 }} />
        <div style={{ fontSize:"0.68rem", letterSpacing:"0.16em", textTransform:"uppercase", color:T.amber, fontWeight:600, marginBottom:10 }}>Get Started</div>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(1.4rem,2.5vw,2rem)", fontWeight:600, letterSpacing:"-0.025em", marginBottom:8 }}>Ready to move faster?</h2>
        <p style={{ color:T.muted, fontSize:"0.9rem", marginBottom:"2rem" }}>Tell us what you're building. We'll respond within 48 hours with a clear plan.</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link to="/contact" style={{ background:T.cyan, border:"none", color:"#050a12", padding:"0.75rem 1.75rem", borderRadius:5, fontSize:"0.85rem", fontFamily:"Inter,sans-serif", fontWeight:600, cursor:"pointer", textDecoration:"none" }}>
            Book a Discovery Call
          </Link>
          <a href="mailto:support@kaizenagentics.com" style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.75rem 1.75rem", borderRadius:5, fontSize:"0.85rem", fontFamily:"Inter,sans-serif", cursor:"pointer", textDecoration:"none" }}>
            support@kaizenagentics.com
          </a>
        </div>
      </div>
    </PageShell>
  );
}
