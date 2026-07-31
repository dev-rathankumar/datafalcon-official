import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { T } from "./theme";
import PageShell from "./components/PageShell";
import ParticleNet from "./components/ParticleNet";
import Reveal, { RevealItem } from "./components/Reveal";
import { fetchTeamMembers } from "./api";

function TeamCard({ member, index }) {
  const [hovered, setHovered] = useState(false);
  const reversed = index % 2 === 1;

  return (
    <RevealItem>
      <div
        className="df-team-row"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: reversed ? "row-reverse" : "row",
          alignItems: "stretch",
          gap: "2.5rem",
          borderRadius: 18,
          overflow: "hidden",
          border: `1px solid ${hovered ? "rgba(0,212,255,0.22)" : "rgba(0,212,255,0.08)"}`,
          background: T.surface,
          transition: "border-color 0.25s ease",
          textAlign: "left",
        }}
      >
        <div
          className="df-team-photo"
          style={{
            flex: "0 0 38%",
            minHeight: 340,
            overflow: "hidden",
            background: T.card,
          }}
        >
          {member.photo_url ? (
            <img
              src={member.photo_url}
              alt={member.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 340 }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center", color: T.dim, fontSize: "3rem" }}>
              {member.name.charAt(0)}
            </div>
          )}
        </div>

        <div
          className="df-team-content"
          style={{
            flex: 1,
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 10 }}>
            {member.role_label}
          </div>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.4rem,2.2vw,1.85rem)", fontWeight: 600, color: T.text, letterSpacing: "-0.02em", marginBottom: 8 }}>
            {member.name}
          </h3>
          <div style={{ fontSize: "0.9rem", fontWeight: 500, color: T.cyan, marginBottom: 18 }}>
            {member.designation}
          </div>
          {member.bio && (
            <p style={{ fontSize: "0.88rem", color: T.muted, lineHeight: 1.8, fontWeight: 300, margin: 0, maxWidth: 520 }}>
              {member.bio}
            </p>
          )}
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20, fontSize: "0.8rem", color: T.cyan, textDecoration: "none" }}
            >
              <ExternalLink size={15} />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </RevealItem>
  );
}

export default function About() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamMembers()
      .then(setMembers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <section style={{ position: "relative", overflow: "hidden", minHeight: 340, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <ParticleNet />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: `linear-gradient(transparent,${T.bg})`, pointerEvents: "none", zIndex: 1 }} />
        <Reveal style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "3.5rem 2rem 2.5rem", maxWidth: 720 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0.32rem 1rem", border: "0.5px solid rgba(0,212,255,0.25)", borderRadius: 100, background: "rgba(0,212,255,0.05)", fontSize: "0.67rem", letterSpacing: "0.13em", textTransform: "uppercase", color: T.cyan, fontWeight: 500, marginBottom: "1.5rem" }}>
            About Us
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.9rem,3.6vw,2.85rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.03em", marginBottom: "1rem", color: T.text }}>
            Building Intelligent Systems with <span style={{ color: T.cyan }}>Purpose</span>
          </h1>
          <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.75, fontWeight: 300 }}>
            Kaizen Agentics helps organizations harness AI, software engineering, and modern data platforms to solve complex business challenges and deliver lasting impact.
          </p>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      <section className="df-sec" style={{ padding: "4rem 2rem", maxWidth: 860, margin: "0 auto", textAlign: "left" }}>
        <Reveal>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.3rem,2.2vw,1.65rem)", fontWeight: 600, letterSpacing: "-0.025em", color: T.text, marginBottom: 16 }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>
            We believe technology should create clarity, not complexity. Our team partners with forward-thinking organizations to design and deliver AI-native solutions — from autonomous agent systems to enterprise data platforms — that are built to scale, govern, and perform in production.
          </p>
          <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>
            Every engagement is led by experienced engineers who bring deep expertise in AI, cloud architecture, and software engineering to help clients move faster with confidence.
          </p>
        </Reveal>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      <section className="df-sec" style={{ padding: "4rem 2rem", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 8 }}>
            Leadership
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.3rem,2.5vw,1.75rem)", fontWeight: 600, letterSpacing: "-0.025em", color: T.text }}>
            Meet the Team
          </h2>
        </Reveal>

        {loading && (
          <p style={{ color: T.muted, fontSize: "0.9rem" }}>Loading team...</p>
        )}
        {error && (
          <p style={{ color: T.amber, fontSize: "0.9rem" }}>{error}</p>
        )}
        {!loading && !error && (
          <Reveal stagger={0.1}>
            <div className="df-about-grid" style={{ display: "grid", gap: 24 }}>
              {members.map((member, index) => (
                <TeamCard key={member.id} member={member} index={index} />
              ))}
            </div>
          </Reveal>
        )}
      </section>

      <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 14, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.2rem,2.2vw,1.65rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 10, color: T.text }}>
          Want to work with us?
        </h2>
        <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "1.75rem" }}>
          We'd love to hear about your project and explore how we can help.
        </p>
        <Link to="/contact" style={{ display: "inline-block", background: T.cyan, color: "#050a12", padding: "0.75rem 1.75rem", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", fontWeight: 600, textDecoration: "none" }}>
          Get in Touch
        </Link>
      </div>
    </PageShell>
  );
}
