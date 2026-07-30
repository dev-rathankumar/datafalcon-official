import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Clock, Globe, Timer, Send } from "lucide-react";
import { T } from "./theme";
import PageShell from "./components/PageShell";
import ParticleNet from "./components/ParticleNet";
import Reveal, { RevealItem } from "./components/Reveal";

const SERVICE_OPTIONS = [
  "Software Development",
  "Artificial Intelligence",
  "AI Workflow Automation",
  "Data Engineering",
  "Databricks Consulting",
  "Cloud Solutions",
  "Other",
];

const BUDGET_OPTIONS = [
  "Less than $10K",
  "$10K – $25K",
  "$25K – $50K",
  "$50K+",
  "Let's Discuss",
];

const INFO_CARDS = [
  {
    icon: Mail,
    title: "Email",
    lines: ["contact@kaizenagentics.io"],
    href: "mailto:contact@kaizenagentics.io",
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday – Friday", "9:00 AM – 6:00 PM"],
  },
  {
    icon: Globe,
    title: "Global Delivery",
    lines: ["Serving clients worldwide"],
  },
  {
    icon: Timer,
    title: "Response Time",
    lines: ["Typically within one business day"],
  },
];

const NEXT_STEPS = [
  {
    n: "01",
    title: "Discovery Call",
    description: "We understand your goals, challenges, and project requirements.",
  },
  {
    n: "02",
    title: "Solution Planning",
    description: "Our team prepares a recommended approach, architecture, and engagement model.",
  },
  {
    n: "03",
    title: "Project Kickoff",
    description: "Once approved, we begin development with clear milestones and transparent communication.",
  },
];

const labelStyle = {
  display: "block",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: T.muted,
  marginBottom: 8,
  letterSpacing: "0.02em",
  textAlign: "left",
};

const fieldStyle = {
  width: "100%",
  padding: "0.72rem 0.9rem",
  borderRadius: 10,
  border: `1px solid rgba(0,212,255,0.1)`,
  background: "rgba(5,10,18,0.5)",
  color: T.text,
  fontSize: "0.85rem",
  fontFamily: "Inter, sans-serif",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

function InfoCard({ icon: Icon, title, lines, href }) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        y: hovered ? -3 : 0,
        borderColor: hovered ? "rgba(0,212,255,0.22)" : "rgba(0,212,255,0.08)",
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "1.15rem 1.2rem",
        borderRadius: 16,
        border: "1px solid rgba(0,212,255,0.08)",
        background: "linear-gradient(145deg, rgba(13,26,42,0.7) 0%, rgba(10,20,34,0.55) 100%)",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.14)",
          color: T.cyan,
        }}
      >
        <Icon size={17} strokeWidth={1.75} />
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: T.text, marginBottom: 4 }}>{title}</div>
        {lines.map((line) => (
          <div key={line} style={{ fontSize: "0.78rem", color: T.muted, lineHeight: 1.55 }}>{line}</div>
        ))}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
        {content}
      </a>
    );
  }
  return content;
}

function FormField({ label, required, children }) {
  return (
    <div style={{ textAlign: "left" }}>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: T.cyan, marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  }

  return (
    <PageShell>
      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ParticleNet />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(transparent,${T.bg})`, pointerEvents: "none", zIndex: 1 }} />
        <Reveal style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "3.5rem 2rem 2.5rem", width: "100%", maxWidth: 720 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.32rem 1rem", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 100, background: "rgba(0,212,255,0.05)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: T.cyan, fontWeight: 500, marginBottom: "1.5rem" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.cyan, display: "inline-block", animation: "blink 2s infinite" }} />
            Contact
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.9rem,3.6vw,2.85rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1.1rem" }}>
            Let's Build Something <span style={{ color: T.cyan }}>Intelligent</span> Together
          </h1>
          <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.75, maxWidth: 560, fontWeight: 300, marginBottom: "2rem" }}>
            Whether you're exploring AI, modernizing your software, or building a scalable data platform, we'd love to hear about your project.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#contact-form" style={{ background: T.cyan, border: "none", color: "#050a12", padding: "0.72rem 1.6rem", borderRadius: 8, fontSize: "0.83rem", fontFamily: "Inter,sans-serif", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
              Schedule a Consultation
            </a>
            <Link to="/our-expertise" style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, padding: "0.72rem 1.6rem", borderRadius: 8, fontSize: "0.83rem", fontFamily: "Inter,sans-serif", cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              View Our Expertise
            </Link>
          </div>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* Main split section */}
      <section className="df-contact-main" style={{ padding: "3.5rem 2rem 4.5rem", maxWidth: 1140, margin: "0 auto" }}>
        <div className="df-contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.3rem,2.2vw,1.65rem)", fontWeight: 600, letterSpacing: "-0.025em", color: T.text, marginBottom: 12, textAlign: "left" }}>
              Tell us about your project
            </h2>
            <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.75, fontWeight: 300, marginBottom: "2rem", textAlign: "left" }}>
              Share your business goals, technical challenges, or ideas. Our team will review your requirements and get back to you with the next steps.
            </p>
            <div style={{ display: "grid", gap: 12 }}>
              {INFO_CARDS.map((card) => (
                <InfoCard key={card.title} {...card} />
              ))}
            </div>
          </div>

          <motion.div
            id="contact-form"
            className="df-contact-form"
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
            style={{
              padding: "2rem 1.75rem",
              borderRadius: 18,
              border: "1px solid rgba(0,212,255,0.1)",
              background: "linear-gradient(160deg, rgba(13,26,42,0.9) 0%, rgba(10,20,34,0.75) 100%)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,212,255,0.04)",
              textAlign: "left",
            }}
          >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", color: T.cyan }}>
                    <Send size={22} strokeWidth={1.75} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.15rem", fontWeight: 600, color: T.text, marginBottom: 8 }}>Inquiry received</h3>
                  <p style={{ fontSize: "0.88rem", color: T.muted, lineHeight: 1.65 }}>Thank you for reaching out. We'll review your project details and respond within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18, textAlign: "left" }}>
                  <div className="df-contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <FormField label="Full Name" required>
                      <input className="df-input" type="text" name="name" required style={fieldStyle} placeholder="Jane Smith" />
                    </FormField>
                    <FormField label="Company" required>
                      <input className="df-input" type="text" name="company" required style={fieldStyle} placeholder="Acme Corp" />
                    </FormField>
                  </div>

                  <div className="df-contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <FormField label="Business Email" required>
                      <input className="df-input" type="email" name="email" required style={fieldStyle} placeholder="jane@company.com" />
                    </FormField>
                    <FormField label="Phone Number">
                      <input className="df-input" type="tel" name="phone" style={fieldStyle} placeholder="+1 (555) 000-0000" />
                    </FormField>
                  </div>

                  <FormField label="Country" required>
                    <input className="df-input" type="text" name="country" required style={fieldStyle} placeholder="United States" />
                  </FormField>

                  <div className="df-contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <FormField label="Service Interested In" required>
                      <select className="df-input" name="service" required defaultValue="" style={{ ...fieldStyle, cursor: "pointer" }}>
                        <option value="" disabled>Select a service</option>
                        {SERVICE_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </FormField>
                    <FormField label="Project Budget" required>
                      <select className="df-input" name="budget" required defaultValue="" style={{ ...fieldStyle, cursor: "pointer" }}>
                        <option value="" disabled>Select a range</option>
                        {BUDGET_OPTIONS.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Project Details" required>
                    <textarea
                      className="df-input"
                      name="details"
                      required
                      rows={5}
                      style={{ ...fieldStyle, resize: "vertical", minHeight: 120 }}
                      placeholder="Tell us about your project goals, timeline, and any technical requirements..."
                    />
                  </FormField>

                  <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", textAlign: "left" }}>
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      style={{ marginTop: 3, accentColor: T.cyan }}
                    />
                    <span style={{ fontSize: "0.78rem", color: T.muted, lineHeight: 1.55 }}>
                      I agree to be contacted regarding my inquiry.
                    </span>
                  </label>

                  <motion.button
                    type="submit"
                    disabled={!agreed}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    animate={{
                      y: btnHover && agreed ? -2 : 0,
                      boxShadow: btnHover && agreed ? "0 8px 28px rgba(0,212,255,0.25)" : "0 2px 12px rgba(0,212,255,0.1)",
                    }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1.5rem",
                      borderRadius: 10,
                      border: "none",
                      background: agreed ? T.cyan : "rgba(0,212,255,0.25)",
                      color: "#050a12",
                      fontSize: "0.88rem",
                      fontFamily: "Inter,sans-serif",
                      fontWeight: 600,
                      cursor: agreed ? "pointer" : "not-allowed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <Send size={16} strokeWidth={2} />
                    Send Inquiry
                  </motion.button>
                </form>
              )}
            </motion.div>
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      {/* What Happens Next */}
      <section style={{ padding: "4.5rem 2rem", maxWidth: 1080, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 600, letterSpacing: "-0.025em", color: T.text }}>
            What Happens Next?
          </h2>
        </Reveal>
        <Reveal stagger={0.1}>
          <div className="df-contact-steps" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {NEXT_STEPS.map((step) => (
              <RevealItem key={step.n}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(0,212,255,0.2)" }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: "1.75rem 1.5rem",
                    borderRadius: 18,
                    border: "1px solid rgba(0,212,255,0.08)",
                    background: T.surface,
                    height: "100%",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.72rem", fontWeight: 700, color: T.cyan, letterSpacing: "0.12em", marginBottom: 12 }}>{step.n}</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.95rem", fontWeight: 600, color: T.text, marginBottom: 8 }}>{step.title}</div>
                  <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.65, fontWeight: 300, margin: 0 }}>{step.description}</p>
                </motion.div>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Bottom CTA */}
      <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 18, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3.5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 200, height: 1, background: T.cyan, opacity: 0.4 }} />
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 12, color: T.text }}>
            Ready to Turn Ideas Into Intelligent Solutions?
          </h2>
          <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
            Let's discuss how Kaizen Agentics can help your business leverage AI, software engineering, and modern data platforms.
          </p>
          <a href="#contact-form" style={{ display: "inline-block", background: T.cyan, border: "none", color: "#050a12", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.88rem", fontFamily: "Inter,sans-serif", fontWeight: 600, cursor: "pointer", textDecoration: "none" }}>
            Book a Free Consultation
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
