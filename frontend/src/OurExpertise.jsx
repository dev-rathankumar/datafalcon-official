import { useState } from "react";
import { Link } from "react-router-dom";
import { T } from "./theme";
import PageShell from "./components/PageShell";
import ParticleNet from "./components/ParticleNet";
import { EXPERTISE_AREAS } from "./data/expertiseAreas";

const PROCESS = [
  { n: "01", t: "Discover", d: "We scope the problem, your data, and your constraints before writing a line of code." },
  { n: "02", t: "Design", d: "Architecture, timeline, and fixed pricing — agreed before the build starts." },
  { n: "03", t: "Build", d: "Senior engineers ship in weekly milestones, with you in the loop the whole way." },
  { n: "04", t: "Deploy & Support", d: "We ship to production and stay on to monitor, tune, and extend." },
];

function ExpertiseCard({ slug, icon, title, tagline, image }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      to={`/our-expertise/${slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? T.card2 : T.card,
        border: `0.5px solid ${hov ? "rgba(0,212,255,0.2)" : T.border}`,
        borderRadius: 14,
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.2s, background 0.2s, transform 0.2s",
        transform: hov ? "translateY(-3px)" : "none",
      }}
    >
      <img src={image} alt={title} style={{ width: "100%", height: 160, objectFit: "cover", opacity: hov ? 1 : 0.85, transition: "opacity 0.2s" }} />
      <div style={{ padding: "1.4rem 1.35rem", flex: 1, display: "flex", flexDirection: "column", textAlign: "left" }}>
        <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "0.5px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "0.85rem", color: T.cyan }}>
          {icon}
        </div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.95rem", fontWeight: 600, marginBottom: 6, color: T.text }}>{title}</div>
        <div style={{ fontSize: "0.8rem", color: T.muted, lineHeight: 1.6, marginBottom: 10, flex: 1 }}>{tagline}</div>
        <div style={{ fontSize: "0.72rem", color: T.cyan }}>Learn more →</div>
      </div>
    </Link>
  );
}

export default function OurExpertise() {
  return (
    <PageShell>
      <section style={{ position: "relative", overflow: "hidden", minHeight: 340, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ParticleNet />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(transparent,${T.bg})`, pointerEvents: "none", zIndex: 1 }} />
        <div className="df-page-hero" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3.5rem 2rem 2.5rem", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.32rem 1rem", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 100, background: "rgba(0,212,255,0.05)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: T.cyan, fontWeight: 500, marginBottom: "1.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "blink 2s infinite" }} />
            Our Expertise
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.9rem,3.6vw,2.9rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.1rem", maxWidth: 700 }}>
            Capabilities <span style={{ color: T.cyan }}>built</span> for <span style={{ color: T.amber }}>complex challenges.</span>
          </h1>
          <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.75, maxWidth: 540, fontWeight: 300 }}>
            From modern software platforms to AI-powered systems and enterprise data solutions, our expertise is designed to solve high-impact business problems.
          </p>
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1080, margin: "0 auto" }}>
        <div className="df-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {EXPERTISE_AREAS.map((s) => <ExpertiseCard key={s.slug} {...s} />)}
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 8 }}>How We Work</div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>A simple, transparent process</h2>
          <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>Every engagement follows the same four stages.</p>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {PROCESS.map((w) => (
            <div key={w.n} style={{ display: "flex", gap: 14, padding: "1.2rem", border: `0.5px solid ${T.border}`, borderRadius: 6, background: T.surface }}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.7rem", fontWeight: 700, color: T.cyan, letterSpacing: "0.1em", minWidth: 28, paddingTop: 2 }}>{w.n}</div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: 4 }}>{w.t}</div>
                <div style={{ fontSize: "0.8rem", color: T.muted, lineHeight: 1.6 }}>{w.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 10, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 1, background: T.cyan, opacity: 0.4 }} />
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 10 }}>Get Started</div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Not sure where to start?</h2>
        <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "2rem" }}>Tell us what you're building. We'll recommend the right approach within one business day.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/contact" style={{ background: T.cyan, border: "none", color: "#050a12", padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
            Book a Discovery Call
          </Link>
          <a href="mailto:contact@kaizenagentics.io" style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", cursor: "pointer", textDecoration: "none" }}>
            contact@kaizenagentics.io
          </a>
        </div>
      </div>
    </PageShell>
  );
}
