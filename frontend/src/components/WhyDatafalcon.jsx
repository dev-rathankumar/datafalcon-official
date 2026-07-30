import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  BarChart3,
  Zap,
  Link2,
  Building2,
  Handshake,
} from "lucide-react";
import { T } from "../theme";
import Reveal, { RevealItem } from "./Reveal";

const PILLARS = [
  {
    icon: Bot,
    title: "AI-First Engineering",
    description:
      "We architect intelligent systems where AI is built into the core of the solution—not added later as a feature.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Intelligence",
    description:
      "Transform business data into actionable insights that power automation, analytics, and smarter decisions.",
  },
  {
    icon: Zap,
    title: "Production-Ready Solutions",
    description:
      "Every solution is engineered for scalability, security, reliability, and long-term maintainability.",
  },
  {
    icon: Link2,
    title: "Seamless Integrations",
    description:
      "Connect AI with your existing applications, cloud infrastructure, APIs, databases, CRM, and ERP systems.",
  },
  {
    icon: Building2,
    title: "Enterprise Architecture",
    description:
      "Modern, scalable architectures designed for growth, performance, governance, and operational excellence.",
  },
  {
    icon: Handshake,
    title: "Strategic Technology Partner",
    description:
      "We work as an extension of your team—from discovery and implementation to continuous optimization and innovation.",
  },
];

function PillarCard({ icon: Icon, title, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        borderColor: hovered ? "rgba(0,212,255,0.28)" : "rgba(0,212,255,0.08)",
        boxShadow: hovered
          ? "0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,212,255,0.12), 0 0 24px rgba(0,212,255,0.08)"
          : "0 4px 24px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,212,255,0.04)",
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1.75rem 1.6rem",
        borderRadius: 18,
        border: "1px solid rgba(0,212,255,0.08)",
        background:
          "linear-gradient(145deg, rgba(13,26,42,0.85) 0%, rgba(10,20,34,0.65) 50%, rgba(17,31,49,0.75) 100%)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 0% 0%, rgba(0,212,255,0.06) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          width: 40,
          height: 40,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
          background: hovered ? "rgba(0,212,255,0.12)" : "rgba(0,212,255,0.06)",
          border: `1px solid ${hovered ? "rgba(0,212,255,0.25)" : "rgba(0,212,255,0.12)"}`,
          color: T.cyan,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3
        style={{
          position: "relative",
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: T.text,
          letterSpacing: "-0.02em",
          marginBottom: "0.65rem",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          position: "relative",
          fontSize: "0.84rem",
          color: T.muted,
          lineHeight: 1.7,
          fontWeight: 300,
          flex: 1,
        }}
      >
        {description}
      </p>
    </motion.div>
  );
}

export default function WhyDatafalcon() {
  return (
    <section
      className="df-why"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "5.5rem 2rem",
      }}
    >
      {/* Subtle animated background */}
      <div className="df-why-bg" aria-hidden="true">
        <div className="df-why-grid-lines" />
        <div className="df-why-glow df-why-glow--cyan" />
        <div className="df-why-glow df-why-glow--amber" />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        <Reveal style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: T.amber,
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Why Kaizen Agentics
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: T.text,
              marginBottom: 16,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.15,
            }}
          >
            Engineering AI Solutions That Deliver Real Business Value
          </h2>
          <p
            style={{
              color: T.muted,
              fontSize: "0.95rem",
              lineHeight: 1.75,
              fontWeight: 300,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            We combine AI, software engineering, and modern data platforms to help
            organizations automate processes, accelerate decision-making, and
            build intelligent digital products.
          </p>
        </Reveal>

        <Reveal stagger={0.08} delay={0.1}>
          <div className="df-why-grid">
            {PILLARS.map((pillar) => (
              <RevealItem key={pillar.title}>
                <PillarCard {...pillar} />
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
