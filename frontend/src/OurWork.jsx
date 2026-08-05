import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "./theme";
import PageShell from "./components/PageShell";
import ParticleNet from "./components/ParticleNet";
import Reveal, { RevealItem } from "./components/Reveal";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";
import ArchitectureExplorer from "./components/ArchitectureExplorer";
import { ARCHITECTURES } from "./data/architectures";
import { SUCCESS_STORIES } from "./data/successStories";

// ── DATA ─────────────────────────────────────────────────────────────────────
const JOURNEY_STEPS = [
  { icon: "⌂", label: "Legacy Systems", description: "On-prem databases and siloed spreadsheets with no single source of truth." },
  { icon: "☁", label: "Cloud Migration", description: "Workloads move onto Azure without disrupting day-to-day operations." },
  { icon: "◈", label: "Modern Data Platform", description: "A governed lakehouse or warehouse replaces fragmented point systems." },
  { icon: "▤", label: "Analytics", description: "Self-serve dashboards and reporting built on trusted, unified data." },
  { icon: "⟡", label: "Artificial Intelligence", description: "Predictive models and AI agents grounded in governed enterprise data." },
  { icon: "◎", label: "Business Value", description: "Faster decisions, lower risk, and measurable operational impact." },
];

const TECH_ECOSYSTEM = [
  "Azure", "Databricks", "Microsoft Fabric", "Snowflake", "Azure Data Factory", "Power BI",
  "Python", "PySpark", "SQL", "Delta Lake", "Unity Catalog", "Apache Spark", "Kafka",
  "Artificial Intelligence", "LLMs", "RAG", "Vector Databases",
];

const DELIVERY_PHASES = [
  { n: "01", t: "Discover", d: "Scope, source systems, and constraints.", expanded: "We map every source system, stakeholder, and constraint before writing a line of code, so the platform we design solves the actual problem, not an assumed one." },
  { n: "02", t: "Architect", d: "Target-state architecture and governance model.", expanded: "We design the target architecture, data model, and governance approach up front, validated against your compliance and scale requirements before implementation begins." },
  { n: "03", t: "Engineer", d: "Senior engineers build in weekly milestones.", expanded: "Senior data engineers build pipelines, platforms, and models in transparent weekly milestones, so progress and risk are visible throughout, not just at the end." },
  { n: "04", t: "Validate", d: "Quality, performance, and security testing.", expanded: "Every pipeline is tested for data quality, performance under load, and security before it ever touches production data." },
  { n: "05", t: "Deploy", d: "Production rollout with monitoring in place.", expanded: "We roll out to production with monitoring, alerting, and rollback plans already in place, not bolted on after an incident." },
  { n: "06", t: "Optimize", d: "Ongoing tuning and platform evolution.", expanded: "Post-launch, we continuously tune performance and cost, and evolve the platform as your data and business needs grow." },
];

// ── SHARED BITS ──────────────────────────────────────────────────────────────
function IconBox({ icon, size = 42, style }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: "rgba(0,212,255,0.08)", border: "0.5px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.42, color: T.cyan, flexShrink: 0, ...style }}>
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

// ── SECTION 2: TRANSFORMATION JOURNEY ────────────────────────────────────────
function JourneyStep({ step }) {
  return (
    <div style={{ background: T.surface, border: `0.5px solid ${T.border}`, borderRadius: 10, padding: "1.3rem 1rem", textAlign: "center", height: "100%" }}>
      <IconBox icon={step.icon} size={44} style={{ margin: "0 auto 12px" }} />
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: T.text, marginBottom: 6 }}>{step.label}</div>
      <p style={{ fontSize: "0.74rem", color: T.muted, lineHeight: 1.55 }}>{step.description}</p>
    </div>
  );
}

// ── SECTION 4: SUCCESS STORY VISUAL + ROW ────────────────────────────────────
function StoryVisual({ icon, accent }) {
  return (
    <div className="df-industry-visual" style={{ flex: "0 0 260px" }}>
      <div style={{ position: "relative", height: 200, borderRadius: 14, background: T.surface, border: `0.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 40%, ${accent}22, transparent 65%)` }} />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "relative", zIndex: 1, width: 84, height: 84, borderRadius: 18, background: `${accent}14`, border: `0.5px solid ${accent}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.3rem", color: accent }}
        >
          {icon}
        </motion.div>
      </div>
    </div>
  );
}

function StoryField({ label, color = T.muted, children }) {
  return (
    <div>
      <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}

function SuccessStoryRow({ story, index }) {
  const reversed = index % 2 === 1;
  const accent = index % 2 === 0 ? T.cyan : T.amber;
  return (
    <Reveal direction={reversed ? "left" : "right"} amount={0.15}>
      <div className="df-industry-row" style={{ display: "flex", flexDirection: reversed ? "row-reverse" : "row", gap: "2.5rem", alignItems: "center", padding: "2.5rem 0", borderBottom: `0.5px solid ${T.border}` }}>
        <StoryVisual icon={story.icon} accent={accent} />
        <div style={{ flex: 1, minWidth: 0, display: "grid", gap: "0.9rem" }}>
          <div>
            <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: T.cyan, fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: 100, border: "0.5px solid rgba(0,212,255,0.25)", background: "rgba(0,212,255,0.05)" }}>
              {story.tag}
            </span>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.2rem", fontWeight: 600, letterSpacing: "-0.02em", color: T.text, marginTop: 10 }}>
              {story.title}
            </div>
          </div>
          <StoryField label="Business Challenge">{story.challenge}</StoryField>
          <StoryField label="Architecture" color={T.cyan}>{story.architecture}</StoryField>
          <StoryField label="Solution">{story.solution}</StoryField>
          <div>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, fontWeight: 600, marginBottom: 8 }}>Technology Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {story.stack.map(t => <TechPill key={t} label={t} />)}
            </div>
          </div>
          <div style={{ paddingTop: 10, borderTop: `0.5px solid ${T.border}` }}>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 6 }}>Business Impact</div>
            <p style={{ fontSize: "0.82rem", color: T.text, lineHeight: 1.6, fontWeight: 300 }}>{story.impact}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ── SECTION 5: TECHNOLOGY CLOUD PILL ─────────────────────────────────────────
function TechCloudPill({ label, index }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3 + (index % 5) * 0.4, repeat: Infinity, ease: "easeInOut", delay: (index % 7) * 0.15 }}
      whileHover={{ scale: 1.08, borderColor: "rgba(0,212,255,0.4)", backgroundColor: "rgba(0,212,255,0.12)" }}
      style={{ fontSize: "0.8rem", color: T.muted, padding: "0.55rem 1.15rem", borderRadius: 100, borderWidth: "0.5px", borderStyle: "solid", borderColor: T.border, background: T.surface, whiteSpace: "nowrap", cursor: "default" }}
    >
      {label}
    </motion.div>
  );
}

// ── SECTION 6: DELIVERY PHASE CARD ───────────────────────────────────────────
function DeliveryPhaseCard({ phase, index, expanded, onEnter, onLeave, onToggle }) {
  const open = expanded === index;
  return (
    <div
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
      onClick={() => onToggle(index)}
      style={{ border: `0.5px solid ${open ? "rgba(0,212,255,0.35)" : T.border}`, borderRadius: 10, background: T.surface, padding: "1.2rem 1rem", cursor: "pointer", transition: "border-color 0.25s" }}
    >
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.75rem", fontWeight: 700, color: T.cyan, marginBottom: 10 }}>{phase.n}</div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.9rem", fontWeight: 600, color: T.text, marginBottom: 6 }}>{phase.t}</div>
      <p style={{ fontSize: "0.74rem", color: T.muted, lineHeight: 1.5 }}>{phase.d}</p>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontSize: "0.74rem", color: T.text, lineHeight: 1.55, fontWeight: 300, marginTop: 10, paddingTop: 10, borderTop: `0.5px solid ${T.border}` }}>
              {phase.expanded}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function OurWork() {
  const [deliveryExpanded, setDeliveryExpanded] = useState(null);
  const navigate = useNavigate();

  function scrollToExplorer() {
    document.getElementById("architecture-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <PageShell>
      {/* SECTION 1 — HERO */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 460, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ParticleNet />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(transparent,${T.bg})`, pointerEvents: "none", zIndex: 1 }} />
        <div className="df-page-hero" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3.5rem 2rem 2.5rem", width: "100%" }}>
          <Reveal direction="up">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.32rem 1rem", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 100, background: "rgba(0,212,255,0.05)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: T.cyan, fontWeight: 500, marginBottom: "1.5rem" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "blink 2s infinite" }} />
              Our Work
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.9rem,3.6vw,2.9rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.1rem", maxWidth: 780 }}>
              Enterprise Data <span style={{ color: T.cyan }}>Transformations.</span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.75, maxWidth: 620, fontWeight: 300, marginBottom: "2rem" }}>
              From fragmented legacy systems to AI-ready modern data platforms, we help organizations accelerate innovation through scalable cloud architectures, governed data, and intelligent analytics.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.24}>
            <div className="df-hbtns" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={scrollToExplorer}>Explore Our Work</PrimaryButton>
              <SecondaryButton onClick={() => navigate("/contact")}>Book Consultation</SecondaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 2 — ENTERPRISE TRANSFORMATION JOURNEY */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>The Path Forward</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>
              Enterprise Transformation Journey
            </h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 620, margin: "0 auto" }}>
              Every engagement moves through the same disciplined path — from fragmented legacy systems to measurable business value.
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" stagger={0.1}>
          <div className="df-journey-flow" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {JOURNEY_STEPS.map((step, i) => (
              <Fragment key={step.label}>
                <RevealItem style={{ flex: 1, minWidth: 0 }}>
                  <JourneyStep step={step} />
                </RevealItem>
                {i < JOURNEY_STEPS.length - 1 && (
                  <div className="df-journey-arrow" style={{ flexShrink: 0, color: T.dim, fontSize: "1rem" }}>→</div>
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 3 — INTERACTIVE ARCHITECTURE EXPLORER */}
      <section id="architecture-explorer" className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Eyebrow>The Highlight</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>
              Interactive Architecture Explorer
            </h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 640, margin: "0 auto 2rem" }}>
              Click any node to see how Kaizen Agentics designs, governs, and implements every layer of the platform.
            </p>
          </div>
        </Reveal>
        <Reveal direction="scale">
          <ArchitectureExplorer architectures={ARCHITECTURES} />
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 4 — ENTERPRISE SUCCESS STORIES */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Eyebrow>Proof, Not Promises</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>
              Enterprise Success Stories
            </h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 620, margin: "0 auto" }}>
              Real enterprise challenges, the architecture we built, and the measurable outcome that followed.
            </p>
          </div>
        </Reveal>
        <div>
          {SUCCESS_STORIES.map((story, i) => (
            <SuccessStoryRow key={story.title} story={story} index={i} />
          ))}
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 5 — TECHNOLOGY ECOSYSTEM */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>Our Toolkit</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>
              Technology Ecosystem
            </h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300 }}>
              The platforms and languages behind every engagement.
            </p>
          </div>
        </Reveal>
        <Reveal direction="scale">
          <div className="df-tech-cloud" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {TECH_ECOSYSTEM.map((label, i) => (
              <TechCloudPill key={label} label={label} index={i} />
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* SECTION 6 — DELIVERY FRAMEWORK */}
      <section className="df-sec" style={{ padding: "3.5rem 2rem", maxWidth: 1180, margin: "0 auto" }}>
        <Reveal direction="up">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <Eyebrow>How We Work</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>
              Delivery Framework
            </h2>
            <p style={{ color: T.muted, fontSize: "0.9rem", lineHeight: 1.7, fontWeight: 300, maxWidth: 560, margin: "0 auto" }}>
              Hover or tap any phase for how we run it end to end.
            </p>
          </div>
        </Reveal>
        <Reveal direction="up" stagger={0.06}>
          <div className="df-delivery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10 }}>
            {DELIVERY_PHASES.map((phase, i) => (
              <RevealItem key={phase.t}>
                <DeliveryPhaseCard
                  phase={phase}
                  index={i}
                  expanded={deliveryExpanded}
                  onEnter={setDeliveryExpanded}
                  onLeave={() => setDeliveryExpanded(null)}
                  onToggle={i => setDeliveryExpanded(cur => (cur === i ? null : i))}
                />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <Reveal direction="scale">
        <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 10, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 1, background: T.cyan, opacity: 0.4 }} />
          <Eyebrow>Get Started</Eyebrow>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 8 }}>
            Let's Build Your Modern Data Platform.
          </h2>
          <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "2rem" }}>
            Tell us about your data and your goals. We'll respond within 48 hours with a clear plan.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <PrimaryButton onClick={() => navigate("/contact")}>Book Consultation</PrimaryButton>
            <SecondaryButton onClick={() => navigate("/contact")}>Talk to an Expert</SecondaryButton>
          </div>
        </div>
      </Reveal>
    </PageShell>
  );
}
