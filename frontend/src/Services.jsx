import { T } from "./theme";
import PageShell from "./components/PageShell";
import ParticleNet from "./components/ParticleNet";

// ── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "◈",
    title: "Azure Databricks & Data Engineering",
    desc: "End-to-end data platforms built on Azure Databricks — ingestion, transformation, and governance at scale.",
    bullets: [
      "Medallion architecture (bronze / silver / gold) pipelines on Delta Lake",
      "Spark-based ETL/ELT for batch and streaming workloads",
      "Lakehouse design, orchestration & warehousing (ADF, Airflow, Unity Catalog)",
      "BI-ready datasets and dashboards for Power BI, Looker & Tableau",
    ],
  },
  {
    icon: "⟡",
    title: "Agentic AI Applications",
    desc: "Autonomous AI agents that reason, plan, and take action across your workflows — not just chatbots.",
    bullets: [
      "Multi-agent orchestration for complex, multi-step business processes",
      "Tool-using agents wired directly into your internal systems & APIs",
      "RAG pipelines and knowledge-grounded reasoning",
      "Human-in-the-loop guardrails for safe, auditable autonomy",
    ],
  },
  {
    icon: "⟳",
    title: "Automations",
    desc: "We eliminate manual busywork by wiring your tools together into automated, self-running workflows.",
    bullets: [
      "Workflow automation across CRMs, ERPs & internal tools",
      "Event-driven pipelines that trigger on real business events",
      "Document, email, and reporting automation",
      "Legacy manual-process modernization",
    ],
  },
  {
    icon: "⇄",
    title: "API Development",
    desc: "Secure, well-documented APIs that connect your products, partners, and internal services.",
    bullets: [
      "REST & GraphQL API design and development",
      "Third-party integrations & webhook infrastructure",
      "Authentication, rate-limiting & versioning built-in",
      "OpenAPI documentation & client SDK generation",
    ],
  },
  {
    icon: "◉",
    title: "Machine Learning Models",
    desc: "Custom ML models — from prototype to production — tuned for your data and deployed to scale.",
    bullets: [
      "Predictive models: forecasting, classification & scoring",
      "Model training, evaluation & hyperparameter tuning",
      "MLOps: CI/CD for models, monitoring & retraining",
      "Deployment as APIs, batch jobs, or embedded services",
    ],
  },
];

const PROCESS = [
  { n: "01", t: "Discover",  d: "We scope the problem, your data, and your constraints before writing a line of code." },
  { n: "02", t: "Design",    d: "Architecture, timeline, and fixed pricing — agreed before the build starts." },
  { n: "03", t: "Build",     d: "Senior engineers ship in weekly milestones, with you in the loop the whole way." },
  { n: "04", t: "Deploy & Support", d: "We ship to production and stay on to monitor, tune, and extend." },
];

// ── SERVICE DETAIL CARD ──────────────────────────────────────────────────────
function ServiceDetailCard({ icon, title, desc, bullets }) {
  return (
    <div style={{ background: T.surface, border: `0.5px solid ${T.border}`, borderRadius: 10, padding: "1.75rem 1.6rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ width: 42, height: 42, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "0.5px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", color: T.cyan }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.05rem", fontWeight: 600, marginBottom: 6, color: T.text }}>{title}</div>
        <div style={{ fontSize: "0.85rem", color: T.muted, lineHeight: 1.65 }}>{desc}</div>
      </div>
      <div style={{ display: "grid", gap: 8, marginTop: 2 }}>
        {bullets.map(b => (
          <div key={b} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: "0.8rem", color: T.muted, lineHeight: 1.55 }}>
            <span style={{ color: T.cyan, marginTop: 2, flexShrink: 0 }}>›</span>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <PageShell>
      {/* PAGE HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 340, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ParticleNet />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(transparent,${T.bg})`, pointerEvents: "none", zIndex: 1 }} />
        <div className="df-page-hero" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3.5rem 2rem 2.5rem", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.32rem 1rem", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 100, background: "rgba(0,212,255,0.05)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: T.cyan, fontWeight: 500, marginBottom: "1.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "blink 2s infinite" }} />
            Our Services
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.9rem,3.6vw,2.9rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.1rem", maxWidth: 700 }}>
            The full stack, from <span style={{ color: T.cyan }}>raw data</span> to <span style={{ color: T.amber }}>autonomous agents</span>.
          </h1>
          <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.75, maxWidth: 540, fontWeight: 300 }}>
            Five disciplines, one senior team. We build the data and AI infrastructure that lets your business move faster.
          </p>
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SERVICES GRID */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1000, margin: "0 auto" }}>
        <div className="df-services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
          {SERVICES.map(s => <ServiceDetailCard key={s.title} {...s} />)}
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* PROCESS */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 8 }}>How We Work</div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>A simple, transparent process</h2>
          <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>Every engagement follows the same four stages, regardless of service.</p>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {PROCESS.map(w => (
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

      {/* CTA */}
      <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 10, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 1, background: T.cyan, opacity: 0.4 }} />
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 10 }}>Get Started</div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Not sure which service fits?</h2>
        <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "2rem" }}>Tell us what you're building. We'll recommend the right approach within 48 hours.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ background: T.cyan, border: "none", color: "#050a12", padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", fontWeight: 600, cursor: "pointer" }}>
            Book a Discovery Call
          </button>
          <button style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.muted; e.currentTarget.style.color = T.text; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.dim; e.currentTarget.style.color = T.muted; }}>
            hello@datafalcon.io
          </button>
        </div>
      </div>
    </PageShell>
  );
}
