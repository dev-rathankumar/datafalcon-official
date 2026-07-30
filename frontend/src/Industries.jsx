import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./theme";
import PageShell from "./components/PageShell";
import ParticleNet from "./components/ParticleNet";
import Reveal, { RevealItem } from "./components/Reveal";
import AnimatedCounter from "./components/AnimatedCounter";

// ── DATA ─────────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    icon: "⚕",
    title: "Healthcare & Life Sciences",
    description: "Clinical, claims, and lab data trapped in disconnected systems slows down the care decisions that matter most. We build governed platforms that turn scattered patient data into real-time clinical intelligence.",
    challenges: [
      "Clinical data locked in disconnected EHR, lab, and claims systems",
      "HIPAA and regulatory pressure slows down every analytics initiative",
      "Manual reporting delays population health and quality measures",
      "Legacy on-prem systems can't support real-time patient insights",
    ],
    solutions: [
      "Unified clinical data platforms on Azure Databricks and Microsoft Fabric",
      "Governed patient analytics with role-based access and full audit trails",
      "Automated regulatory and quality-measure reporting pipelines",
      "AI models for readmission risk, care gaps, and patient outreach",
    ],
    outcomes: "Reporting cycles that took weeks now run in hours, with every clinical metric traceable back to its source.",
    tech: ["Azure Databricks", "Microsoft Fabric", "Snowflake", "Oracle", "Power BI", "ADF", "PySpark"],
  },
  {
    icon: "◈",
    title: "Insurance",
    description: "Claims, policy, and customer data spread across legacy systems make fraud invisible and underwriting slow. We build the analytics layer that catches fraud before payout and gives underwriters real-time risk signals.",
    challenges: [
      "Claims and policy data spread across legacy policy admin systems",
      "Manual fraud review can't keep pace with claim volume",
      "Underwriters lack real-time risk signals at the point of quote",
      "Disconnected customer data prevents a single view of the policyholder",
    ],
    solutions: [
      "Claims analytics platforms that flag anomalies before payout",
      "ML-based fraud detection scoring every claim in real time",
      "Underwriting intelligence combining internal and external risk data",
      "Customer 360 platforms unifying policies, claims, and interactions",
      "AI document processing for intake forms and adjuster reports",
    ],
    outcomes: "Fraud is caught before the payout, not after, and underwriters quote with risk signals instead of guesswork.",
    tech: ["Databricks", "Azure", "Snowflake", "Fabric", "Power BI", "Python", "SQL"],
  },
  {
    icon: "◆",
    title: "Banking & Financial Services",
    description: "Regulatory reporting eats weeks of manual effort while fraud patterns evolve faster than rule-based systems can track. We modernize the platform underneath so risk, fraud, and compliance run in real time.",
    challenges: [
      "Fragmented data across core banking, cards, and lending systems",
      "Regulatory reporting consumes weeks of manual reconciliation",
      "Fraud patterns evolve faster than rule-based detection systems",
      "Legacy infrastructure can't scale to real-time transaction volumes",
    ],
    solutions: [
      "Risk analytics platforms unifying credit, market, and operational risk data",
      "Automated regulatory reporting pipelines with full lineage and audit trails",
      "Real-time fraud detection models scoring transactions as they happen",
      "Cloud migration off legacy mainframe and batch ETL infrastructure",
    ],
    outcomes: "Regulatory submissions move from weeks to days, fully auditable, with fraud scored in milliseconds instead of overnight batches.",
    tech: ["Azure", "Databricks", "Snowflake", "SQL", "Python", "Power BI"],
  },
  {
    icon: "⚙",
    title: "Manufacturing",
    description: "Plant, ERP, and IoT data live in disconnected historians, so downtime gets discovered after it's already cost you the shift. We connect the floor to the enterprise so maintenance becomes predictive, not reactive.",
    challenges: [
      "Plant, ERP, and IoT data live in disconnected historians and systems",
      "Unplanned downtime driven by reactive, not predictive, maintenance",
      "Supply chain visibility stops at the tier-1 supplier",
      "Inventory decisions rely on stale, spreadsheet-based reporting",
    ],
    solutions: [
      "Supply chain analytics platforms spanning suppliers to the shop floor",
      "IoT and sensor pipelines feeding predictive maintenance models",
      "ERP integration unifying production, inventory, and finance data",
      "Operational dashboards giving plant leaders real-time visibility",
    ],
    outcomes: "Maintenance teams now act on failure signals days in advance instead of reacting to a stopped line.",
    tech: ["Azure", "Databricks", "ADF", "Fabric", "Power BI"],
  },
  {
    icon: "▣",
    title: "Retail & E-Commerce",
    description: "Customer data scattered across POS, e-commerce, and loyalty systems means every channel treats the same shopper like a stranger. We unify it into one view that powers personalization and forecasting.",
    challenges: [
      "Customer data scattered across POS, e-commerce, and loyalty systems",
      "Generic promotions instead of personalized recommendations",
      "Demand forecasting lags actual buying behavior",
      "Inventory imbalances between stores, warehouses, and channels",
    ],
    solutions: [
      "Unified customer analytics and segmentation across every channel",
      "Recommendation engines personalizing product discovery in real time",
      "ML-driven sales forecasting tuned to seasonality and promotions",
      "Real-time dashboards connecting inventory, sales, and marketing",
    ],
    outcomes: "Personalized recommendations and tighter forecasts lift conversion while cutting excess inventory.",
    tech: ["Databricks", "Fabric", "Power BI", "Python", "SQL"],
  },
  {
    icon: "⟠",
    title: "Telecommunications",
    description: "Network data moves faster than most platforms can process, so problems surface as customer complaints instead of alerts. We build streaming platforms that catch degradation before it becomes an outage.",
    challenges: [
      "Massive volumes of streaming network and usage data",
      "Network issues detected only after customers are already impacted",
      "Capacity planning based on historical, not real-time, load",
      "Customer usage insight buried across separate billing and network systems",
    ],
    solutions: [
      "Streaming data platforms processing network events in real time",
      "Real-time monitoring and anomaly detection across the network",
      "Usage analytics connecting billing, network, and customer behavior",
      "Capacity planning models forecasting load before it becomes an outage",
    ],
    outcomes: "Degradation is caught and resolved before customers notice, instead of after they've filed a complaint.",
    tech: ["Azure", "Databricks", "Spark Streaming", "Kafka", "Power BI"],
  },
  {
    icon: "⬡",
    title: "Enterprise Technology",
    description: "Enterprises outgrow their warehouses faster than they can govern them, and every new AI initiative stalls without a solid data foundation. We build the lakehouse and governance layer that makes AI possible.",
    challenges: [
      "Data platforms outgrowing legacy warehouses and point tools",
      "No unified governance layer across data, models, and access",
      "Pressure to ship AI features without a reasoning or RAG foundation",
      "Multiple clouds and platforms with no consistent architecture",
    ],
    solutions: [
      "Lakehouse architecture on Databricks, Fabric, and Snowflake",
      "Unity Catalog governance across data, ML, and AI assets",
      "Enterprise AI agents and RAG applications grounded in company data",
      "Cloud modernization strategy spanning multi-cloud environments",
    ],
    outcomes: "New AI and analytics use cases ship in weeks instead of quarters, on a foundation that's governed from day one.",
    tech: ["Azure Databricks", "Microsoft Fabric", "Snowflake", "Delta Lake", "Unity Catalog"],
  },
];

const CASE_STUDIES = [
  {
    tag: "Healthcare",
    title: "Enterprise Clinical Analytics Platform",
    challenge: "A multi-facility health system needed unified visibility into patient outcomes across a dozen disconnected EHR and lab systems.",
    solution: "Data Falcon built a governed clinical data platform on Azure Databricks with automated ingestion from every source system and role-based access for clinical teams.",
    stack: ["Azure Databricks", "ADF", "Power BI", "PySpark"],
    impact: "Reporting cycles cut from weeks to hours; quality measure submissions became fully automated.",
  },
  {
    tag: "Insurance",
    title: "AI-Powered Claims Intelligence",
    challenge: "A regional P&C insurer was losing millions annually to claims fraud that manual review couldn't catch at scale.",
    solution: "We deployed a real-time fraud scoring model wired directly into the claims intake workflow, flagging high-risk claims before payout.",
    stack: ["Databricks", "Snowflake", "Python", "Power BI"],
    impact: "Fraud detection accuracy improved sharply, cutting improper payouts and speeding up clean claims.",
  },
  {
    tag: "Finance",
    title: "Regulatory Reporting Platform",
    challenge: "A mid-size bank's regulatory reporting relied on manual spreadsheet reconciliation across five source systems, taking weeks each cycle.",
    solution: "Data Falcon built an automated regulatory reporting pipeline on Databricks with full data lineage and audit trails.",
    stack: ["Azure", "Databricks", "SQL", "Power BI"],
    impact: "Reporting time dropped from weeks to days, with a fully auditable trail behind every submitted number.",
  },
  {
    tag: "Manufacturing",
    title: "Supply Chain Modernization",
    challenge: "A multi-plant manufacturer had no real-time visibility into inventory or supplier performance, leading to costly production delays.",
    solution: "We built an integrated supply chain analytics platform connecting ERP, IoT sensors, and supplier data into a single operational view.",
    stack: ["Azure", "Databricks", "ADF", "Power BI"],
    impact: "Unplanned downtime dropped meaningfully as predictive maintenance flagged issues before failure.",
  },
  {
    tag: "Retail",
    title: "Customer 360 Platform",
    challenge: "A multi-channel retailer couldn't reconcile customer identity across e-commerce, mobile, and in-store systems, limiting personalization.",
    solution: "Data Falcon unified customer data into a single Customer 360 platform powering segmentation and recommendation models.",
    stack: ["Databricks", "Fabric", "Python", "Power BI"],
    impact: "Personalized recommendations lifted conversion and average order value across every digital channel.",
  },
  {
    tag: "Telecom",
    title: "Streaming Analytics Platform",
    challenge: "A national telecom operator detected network degradation only after customers had already filed complaints.",
    solution: "We built a real-time streaming analytics platform processing network telemetry through Kafka and Spark Streaming for instant anomaly detection.",
    stack: ["Databricks", "Spark Streaming", "Kafka", "Power BI"],
    impact: "Network issues are now caught and resolved before customer impact, lifting service reliability scores.",
  },
  {
    tag: "Enterprise",
    title: "Lakehouse Modernization using Databricks & Unity Catalog",
    challenge: "A global enterprise ran a dozen disconnected data warehouses with no unified governance, slowing every new AI initiative.",
    solution: "Data Falcon consolidated the estate onto a single lakehouse architecture with Unity Catalog governing every table, model, and AI agent.",
    stack: ["Databricks", "Unity Catalog", "Delta Lake", "Azure"],
    impact: "New AI and analytics use cases now ship in weeks instead of quarters, on a fully governed foundation.",
  },
];

const MATRIX_COLUMNS = ["Cloud", "Data Platform", "Analytics", "AI", "Governance"];
const MATRIX = [
  { industry: "Healthcare", cells: ["Azure", "Databricks / Fabric", "Power BI", "AI for Healthcare", "Data Governance"] },
  { industry: "Insurance", cells: ["Azure", "Databricks / Fabric", "Power BI", "Fraud Detection AI", "Regulatory Reporting"] },
  { industry: "Finance", cells: ["Azure", "Databricks / Snowflake", "Power BI", "AI Insights", "Regulatory Reporting"] },
  { industry: "Manufacturing", cells: ["Azure", "Databricks / Fabric", "Power BI", "Predictive Maintenance", "ERP Integration"] },
  { industry: "Retail", cells: ["Azure", "Databricks / Fabric", "Power BI", "Recommendation Systems", "Customer Data Governance"] },
  { industry: "Telecom", cells: ["Azure", "Databricks", "Power BI", "Real-time Monitoring", "Network Data Governance"] },
  { industry: "Enterprise", cells: ["Multi-cloud", "Databricks / Fabric / Snowflake", "Power BI", "AI Agents / LLMs", "Unity Catalog"] },
];

const PILLARS = [
  { t: "Enterprise Architecture", d: "Platforms designed to scale across business units, not just one team." },
  { t: "Modern Data Platforms", d: "Lakehouse and warehouse architectures on Databricks, Fabric, and Snowflake." },
  { t: "Cloud Migration", d: "Legacy systems modernized onto Azure without disrupting the business." },
  { t: "AI Readiness", d: "Governed, well-modeled data that's actually usable by AI and agents." },
  { t: "Governance", d: "Unity Catalog and access controls built in from day one, not bolted on." },
  { t: "Senior Consultants", d: "Every engagement staffed by engineers who've shipped enterprise platforms before." },
  { t: "Fast Delivery", d: "Milestone-based delivery that gets platforms into production in weeks." },
  { t: "Enterprise Scale", d: "Architected for the data volumes and compliance demands of large organizations." },
];

const STATS = [
  { n: "7", l: "Industries Served" },
  { n: "15+", l: "Enterprise Platforms Delivered" },
  { n: "100%", l: "Senior-Led Delivery" },
  { n: "24/7", l: "Enterprise-Scale Support" },
];

// ── SHARED BITS ──────────────────────────────────────────────────────────────
function IconBox({ icon, size = 42 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "0.5px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.42, color: T.cyan, flexShrink: 0 }}>
      {icon}
    </div>
  );
}

function TechPill({ label }) {
  return (
    <span style={{ fontSize: "0.7rem", color: T.muted, padding: "0.32rem 0.7rem", borderRadius: 100, border: `0.5px solid ${T.border}`, background: T.surface, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 8 }}>
      {children}
    </div>
  );
}

// ── INDUSTRY VISUAL (tilt + mouse tracking + glow) ───────────────────────────
function IndustryVisual({ icon, accent }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  }

  return (
    <div className="df-industry-visual" style={{ flex: "0 0 280px", perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 150, damping: 14 }}
        style={{
          position: "relative", height: 220, borderRadius: 14, background: T.surface,
          border: `0.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center",
          transformStyle: "preserve-3d", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 40%, ${accent}22, transparent 65%)` }} />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "relative", zIndex: 1, width: 92, height: 92, borderRadius: 18, background: `${accent}14`, border: `0.5px solid ${accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.6rem", color: accent }}
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── SECTION 2: ZIG-ZAG INDUSTRY ROW ──────────────────────────────────────────
function IndustryRow({ industry, index }) {
  const reversed = index % 2 === 1;
  const accent = index % 2 === 0 ? T.cyan : T.amber;
  return (
    <Reveal direction={reversed ? "left" : "right"} amount={0.15}>
      <div className="df-industry-row" style={{ display: "flex", flexDirection: reversed ? "row-reverse" : "row", gap: "2.5rem", alignItems: "center", padding: "2.5rem 0", borderBottom: `0.5px solid ${T.border}` }}>
        <IndustryVisual icon={industry.icon} accent={accent} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.3rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: 10, color: T.text }}>
            {industry.title}
          </div>
          <p style={{ fontSize: "0.87rem", color: T.muted, lineHeight: 1.7, marginBottom: "1.4rem", maxWidth: 640 }}>
            {industry.description}
          </p>
          <div className="df-challenge-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.4rem" }}>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, fontWeight: 600, marginBottom: 8 }}>Business Challenges</div>
              <div style={{ display: "grid", gap: 6 }}>
                {industry.challenges.slice(0, 3).map(c => (
                  <div key={c} style={{ display: "flex", gap: 8, fontSize: "0.78rem", color: T.muted, lineHeight: 1.55 }}>
                    <span style={{ color: T.amber, flexShrink: 0 }}>×</span><span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, fontWeight: 600, marginBottom: 8 }}>Our Solutions</div>
              <div style={{ display: "grid", gap: 6 }}>
                {industry.solutions.slice(0, 3).map(s => (
                  <div key={s} style={{ display: "flex", gap: 8, fontSize: "0.78rem", color: T.muted, lineHeight: 1.55 }}>
                    <span style={{ color: T.cyan, flexShrink: 0 }}>›</span><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="df-tech-row" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {industry.tech.map(t => <TechPill key={t} label={t} />)}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── SECTION 3: EXPANDABLE SHOWCASE CARD ──────────────────────────────────────
function ExpandCard({ industry, open, onToggle }) {
  return (
    <div style={{ border: `0.5px solid ${open ? "rgba(0,212,255,0.35)" : T.border}`, borderRadius: 10, background: T.surface, overflow: "hidden", transition: "border-color 0.25s" }}>
      <button
        onClick={onToggle}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "1.1rem 1.4rem", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <IconBox icon={industry.icon} size={38} />
        <span style={{ flex: 1, fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.95rem", fontWeight: 600, color: T.text }}>{industry.title}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} style={{ fontSize: "1.1rem", color: T.cyan, flexShrink: 0 }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 1.4rem 1.6rem", display: "grid", gap: "1.2rem" }}>
              <ShowcaseStep label="Business Challenges" color={T.amber} arrow>
                <div style={{ display: "grid", gap: 6 }}>
                  {industry.challenges.map(c => (
                    <div key={c} style={{ display: "flex", gap: 8, fontSize: "0.8rem", color: T.muted, lineHeight: 1.6 }}>
                      <span style={{ color: T.amber, flexShrink: 0 }}>×</span><span>{c}</span>
                    </div>
                  ))}
                </div>
              </ShowcaseStep>
              <ShowcaseStep label="Data Falcon Solution" color={T.cyan} arrow>
                <div style={{ display: "grid", gap: 6 }}>
                  {industry.solutions.map(s => (
                    <div key={s} style={{ display: "flex", gap: 8, fontSize: "0.8rem", color: T.muted, lineHeight: 1.6 }}>
                      <span style={{ color: T.cyan, flexShrink: 0 }}>›</span><span>{s}</span>
                    </div>
                  ))}
                </div>
              </ShowcaseStep>
              <ShowcaseStep label="Technologies" color={T.cyan} arrow>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {industry.tech.map(t => <TechPill key={t} label={t} />)}
                </div>
              </ShowcaseStep>
              <ShowcaseStep label="Business Outcomes" color={T.amber}>
                <p style={{ fontSize: "0.82rem", color: T.text, lineHeight: 1.65, fontWeight: 300 }}>{industry.outcomes}</p>
              </ShowcaseStep>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShowcaseStep({ label, color, arrow, children }) {
  return (
    <div>
      <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color, fontWeight: 600, marginBottom: 8 }}>{label}</div>
      {children}
      {arrow && <div style={{ textAlign: "center", color: T.dim, fontSize: "0.8rem", marginTop: 12 }}>↓</div>}
    </div>
  );
}

// ── SECTION 4: CASE STUDY CARD ───────────────────────────────────────────────
function CaseStudyCard({ study }) {
  return (
    <div style={{ background: T.surface, border: `0.5px solid ${T.border}`, borderRadius: 10, padding: "1.6rem 1.4rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.cyan, fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 100, border: `0.5px solid rgba(0,212,255,0.25)`, background: "rgba(0,212,255,0.05)" }}>
          {study.tag}
        </span>
      </div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1rem", fontWeight: 600, color: T.text, lineHeight: 1.35 }}>{study.title}</div>

      <StoryLine label="Challenge">{study.challenge}</StoryLine>
      <StoryLine label="Solution">{study.solution}</StoryLine>

      <div>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, fontWeight: 600, marginBottom: 8 }}>Technology Stack</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {study.stack.map(t => <TechPill key={t} label={t} />)}
        </div>
      </div>

      <div style={{ marginTop: 4, paddingTop: 12, borderTop: `0.5px solid ${T.border}` }}>
        <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 6 }}>Business Impact</div>
        <p style={{ fontSize: "0.82rem", color: T.text, lineHeight: 1.6, fontWeight: 300 }}>{study.impact}</p>
      </div>
    </div>
  );
}

function StoryLine({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

// ── SECTION 5: TECHNOLOGY MATRIX ─────────────────────────────────────────────
function TechMatrix() {
  const [hoverRow, setHoverRow] = useState(null);
  return (
    <div style={{ overflowX: "auto", border: `0.5px solid ${T.border}`, borderRadius: 10 }}>
      <table className="df-matrix-table" style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "0.9rem 1.1rem", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.amber, fontWeight: 600, background: T.surface, borderBottom: `0.5px solid ${T.border}` }}>Industry</th>
            {MATRIX_COLUMNS.map(c => (
              <th key={c} style={{ textAlign: "left", padding: "0.9rem 1.1rem", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, fontWeight: 600, background: T.surface, borderBottom: `0.5px solid ${T.border}` }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX.map((row, i) => (
            <tr
              key={row.industry}
              onMouseEnter={() => setHoverRow(i)}
              onMouseLeave={() => setHoverRow(null)}
              style={{ background: hoverRow === i ? T.card2 : "transparent", transition: "background 0.2s" }}
            >
              <td style={{ padding: "0.85rem 1.1rem", fontSize: "0.82rem", fontWeight: 600, color: T.text, borderBottom: `0.5px solid ${T.border}`, whiteSpace: "nowrap" }}>{row.industry}</td>
              {row.cells.map((cell, j) => (
                <td key={j} style={{ padding: "0.85rem 1.1rem", fontSize: "0.78rem", color: T.muted, borderBottom: `0.5px solid ${T.border}`, whiteSpace: "nowrap" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function Industries() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageShell>
      {/* SECTION 1 — HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ParticleNet />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(transparent,${T.bg})`, pointerEvents: "none", zIndex: 1 }} />
        <div className="df-page-hero" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3.5rem 2rem 2.5rem", width: "100%" }}>
          <Reveal direction="up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.32rem 1rem", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 100, background: "rgba(0,212,255,0.05)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: T.cyan, fontWeight: 500, marginBottom: "1.5rem" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "blink 2s infinite" }} />
              Industries
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.9rem,3.6vw,2.9rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.1rem", maxWidth: 720 }}>
              Data expertise <span style={{ color: T.cyan }}>across industries.</span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.75, maxWidth: 560, fontWeight: 300 }}>
              Every industry generates data. The organizations that transform data into intelligence become market leaders. Data Falcon helps enterprises modernize their data platforms, analytics, and AI capabilities.
            </p>
          </Reveal>
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 2 — INDUSTRIES WE TRANSFORM */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem 1rem", maxWidth: 1080, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Eyebrow>What We Solve</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Industries we transform</h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 620, margin: "0 auto" }}>
              Seven domains, one engineering discipline — data platforms, analytics, and AI built for how each industry actually works.
            </p>
          </div>
        </Reveal>
        <div>
          {INDUSTRIES.map((industry, i) => (
            <IndustryRow key={industry.title} industry={industry} index={i} />
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 3 — INDUSTRY SHOWCASE */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 860, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>Industry Showcase</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Challenge to outcome, in one view</h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>Expand any industry to see the full path — from business challenge to delivered outcome.</p>
          </div>
        </Reveal>
        <Reveal direction="up" stagger={0.08}>
          <div style={{ display: "grid", gap: 10 }}>
            {INDUSTRIES.map((industry, i) => (
              <RevealItem key={industry.title}>
                <ExpandCard industry={industry} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 4 — ENTERPRISE SUCCESS STORIES */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>Proof, Not Promises</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Enterprise success stories</h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 620, margin: "0 auto" }}>
              Representative engagements across our seven core industries. Details anonymized to protect client confidentiality.
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" stagger={0.08}>
          <div className="df-case-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {CASE_STUDIES.map(study => (
              <RevealItem key={study.title} direction="scale">
                <CaseStudyCard study={study} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 5 — TECHNOLOGY MATRIX */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>Technology Matrix</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>The right stack, per industry</h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>Hover a row to see how our technology choices shift by domain.</p>
          </div>
        </Reveal>
        <Reveal direction="scale">
          <TechMatrix />
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 6 — WHY DATA FALCON */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1080, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>Why Data Falcon</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Built for enterprise scale</h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>The same discipline across every industry we serve.</p>
          </div>
        </Reveal>

        <Reveal direction="scale">
          <div className="df-stats" style={{ display: "flex", border: `0.5px solid ${T.border}`, borderRadius: 8, overflow: "hidden", background: T.surface, marginBottom: "1.75rem" }}>
            {STATS.map((s, i) => (
              <div key={s.l} className="df-stat" style={{ flex: 1, padding: "1.4rem 1rem", textAlign: "center", borderRight: i < STATS.length - 1 ? `0.5px solid ${T.border}` : "none" }}>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.7rem", fontWeight: 700, color: T.cyan, letterSpacing: "-0.02em" }}>
                  <AnimatedCounter value={s.n} />
                </div>
                <div style={{ fontSize: "0.7rem", color: T.muted, marginTop: 3, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="up" stagger={0.06}>
          <div className="df-pillars-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
            {PILLARS.map(p => (
              <RevealItem key={p.t}>
                <div style={{ padding: "1.1rem 1rem", border: `0.5px solid ${T.border}`, borderRadius: 8, background: T.surface, height: "100%" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: T.text, marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontSize: "0.76rem", color: T.muted, lineHeight: 1.55 }}>{p.d}</div>
                </div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </section>

      {/* SECTION 7 — CTA */}
      <Reveal direction="scale">
        <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 10, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 1, background: T.cyan, opacity: 0.4 }} />
          <Eyebrow>Get Started</Eyebrow>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>Let's build your modern data platform.</h2>
          <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "2rem" }}>Tell us about your industry and your data. We'll respond within 48 hours with a clear plan.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{ background: T.cyan, border: "none", color: "#050a12", padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", fontWeight: 600, cursor: "pointer" }}>
              Book a Consultation
            </button>
            <button style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.muted; e.currentTarget.style.color = T.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.dim; e.currentTarget.style.color = T.muted; }}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
