import { useEffect, useRef, useState } from "react";

const T = {
  bg: "#050a12", surface: "#0a1422", card: "#0d1a2a", card2: "#111f31",
  cyan: "#00d4ff", amber: "#f5a623", text: "#e8f4fd",
  muted: "#7a9bb5", dim: "#2a4a6a", border: "rgba(0,212,255,0.10)",
};

// ── PARTICLE NETWORK CANVAS ──────────────────────────────────────────────────
function ParticleNet() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;
    let W, H, dots, frame = 0;

    function init() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.max(Math.floor((W * H) / 9000), 60);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        type: Math.random() < 0.65 ? 0 : Math.random() < 0.7 ? 1 : 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.015,
        hub: Math.random() < 0.12,
      }));
    }

    function dotRGBA(type, alpha) {
      if (type === 0) return `rgba(0,212,255,${alpha})`;
      if (type === 1) return `rgba(245,166,35,${alpha})`;
      return `rgba(180,220,255,${alpha})`;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // subtle grid
      ctx.strokeStyle = "rgba(0,212,255,0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // move dots
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.pulse += d.pulseSpeed;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      });

      // connections
      const MAX_DIST = 130;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const s = 1 - dist / MAX_DIST;
            const useAmber = (a.type === 1 || b.type === 1) && !(a.type === 0 && b.type === 0);
            const la = s * (a.hub || b.hub ? 0.55 : 0.22);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = useAmber ? `rgba(245,166,35,${la})` : `rgba(0,212,255,${la})`;
            ctx.lineWidth = s * (a.hub || b.hub ? 1.2 : 0.7);
            ctx.stroke();
          }
        }
      }

      // draw dots
      dots.forEach(d => {
        const pf = 0.5 + 0.5 * Math.sin(d.pulse);
        const r = d.hub ? d.r * 2.2 : d.r;
        const ba = d.hub ? 0.9 : 0.6 + pf * 0.3;

        // glow for hubs / amber
        if (d.hub || d.type === 1) {
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 5);
          g.addColorStop(0, dotRGBA(d.type, d.hub ? 0.4 : 0.22));
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(d.x, d.y, r * 5, 0, Math.PI * 2); ctx.fill();
        }

        // pulse ring on hubs
        if (d.hub) {
          ctx.beginPath(); ctx.arc(d.x, d.y, r + pf * 8, 0, Math.PI * 2);
          ctx.strokeStyle = dotRGBA(d.type, 0.28 * (1 - pf * 0.5));
          ctx.lineWidth = 0.8; ctx.stroke();
        }

        // core
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dotRGBA(d.type, ba); ctx.fill();

        // white center on hubs
        if (d.hub) {
          ctx.beginPath(); ctx.arc(d.x, d.y, r * 0.38, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fill();
        }
      });

      // travelling packets between hub nodes
      const hubs = dots.filter(d => d.hub).slice(0, 8);
      for (let h = 0; h < hubs.length - 1; h++) {
        const a = hubs[h], b = hubs[h + 1];
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < 280) {
          const t = (frame * 0.008 + h * 0.37) % 1;
          const px = a.x + (b.x - a.x) * t;
          const py = a.y + (b.y - a.y) * t;
          const col = h % 2 === 0 ? "0,212,255" : "245,166,35";
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
          pg.addColorStop(0, `rgba(${col},0.9)`); pg.addColorStop(1, "transparent");
          ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${col})`; ctx.fill();
        }
      }

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      init();
      draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}

// ── SERVICE CARD ─────────────────────────────────────────────────────────────
function SvcCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.card2 : T.card, padding: "1.6rem 1.4rem", cursor: "pointer", transition: "background 0.2s" }}
    >
      <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "0.5px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "1rem", color: T.cyan }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.92rem", fontWeight: 600, marginBottom: 6, color: T.text }}>{title}</div>
      <div style={{ fontSize: "0.8rem", color: T.muted, lineHeight: 1.65, marginBottom: 10 }}>{desc}</div>
      <div style={{ fontSize: "0.72rem", color: T.cyan }}>Learn more →</div>
    </div>
  );
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: "⟡", title: "Agentic AI Systems",  desc: "Autonomous AI agents that reason, plan, and act — handling complex workflows without constant human input." },
  { icon: "◈", title: "Data Engineering",     desc: "Pipelines, warehouses, and dashboards that turn scattered data into clean, reliable business intelligence." },
  { icon: "◉", title: "LLM Integration",      desc: "Embed large language models into your products — custom-tuned, cost-optimised, production-ready." },
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
    <div style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: "'Inter',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
        .df-a { font-size:0.78rem; color:#7a9bb5; text-decoration:none; transition:color 0.2s; }
        .df-a:hover { color:#e8f4fd; }
        .df-fa { font-size:0.75rem; color:#2a4a6a; text-decoration:none; }
        .df-fa:hover { color:#7a9bb5; }
        @media (max-width:768px) {
          .df-nav-links { display:none !important; }
          .df-hero { height:auto !important; min-height:580px !important; }
          .df-hero-inner { padding:2.5rem 1.25rem 2rem !important; }
          .df-svc-grid { grid-template-columns:1fr !important; }
          .df-sec { padding:2.5rem 1.25rem !important; }
          .df-stats { flex-wrap:wrap !important; }
          .df-stat { flex:1 1 45% !important; border-right:none !important; border-bottom:0.5px solid rgba(0,212,255,0.1) !important; }
          .df-stat:last-child { border-bottom:none !important; }
          .df-cta { margin:0 1rem 2rem !important; padding:2rem 1.25rem !important; }
          .df-fi { flex-direction:column !important; text-align:center !important; gap:12px !important; }
          .df-hbtns { flex-wrap:wrap !important; justify-content:center !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.1rem 2rem", borderBottom:`0.5px solid ${T.border}`, background:"rgba(5,10,18,0.97)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.18rem", fontWeight:700, letterSpacing:"-0.02em", display:"flex", alignItems:"center", gap:8 }}>
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
            <path d="M13 1L3 9l2.5 2L3 14l4.5-1-1 5L13 15l6.5 3-1-5 4.5 1-2.5-3 2.5-2L13 1z" fill="none" stroke="#00d4ff" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M13 1L7 11h12L13 1z" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="0.8"/>
          </svg>
          <span style={{ color:T.text }}>data</span><span style={{ color:T.cyan }}>falcon</span>
        </div>
        <div className="df-nav-links" style={{ display:"flex", gap:"1.75rem" }}>
          {["Services","Industries","Our Work","About Us","Contact"].map(l => (
            <a key={l} href="#" className="df-a">{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.46rem 1.1rem", borderRadius:5, fontSize:"0.75rem", fontFamily:"Inter,sans-serif", cursor:"pointer" }}
            onMouseEnter={e=>{e.target.style.borderColor=T.cyan;e.target.style.color=T.cyan;}}
            onMouseLeave={e=>{e.target.style.borderColor=T.dim;e.target.style.color=T.muted;}}>
            Schedule a Call
          </button>
          <button style={{ background:T.cyan, border:"none", color:"#050a12", padding:"0.46rem 1.2rem", borderRadius:5, fontSize:"0.75rem", fontFamily:"Inter,sans-serif", fontWeight:600, cursor:"pointer" }}>
            Let's Talk →
          </button>
        </div>
      </nav>

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

      {/* FOOTER */}
      <footer style={{ borderTop:`0.5px solid ${T.border}`, padding:"1.5rem 2rem" }}>
        <div className="df-fi" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1rem", fontWeight:700 }}>
            data<span style={{ color:T.cyan }}>falcon</span>.io
          </div>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {["Privacy","Terms","Contact","LinkedIn"].map(l => (
              <a key={l} href="#" className="df-fa">{l}</a>
            ))}
          </div>
          <div style={{ fontSize:"0.72rem", color:T.dim }}>© 2026 Datafalcon. India · Global Clients.</div>
        </div>
      </footer>
    </div>
  );
}
