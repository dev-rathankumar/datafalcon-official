import { Link, Navigate, useParams } from "react-router-dom";
import { T } from "./theme";
import PageShell from "./components/PageShell";
import { getExpertiseBySlug } from "./data/expertiseAreas";

export default function ExpertiseDetail() {
  const { slug } = useParams();
  const area = getExpertiseBySlug(slug);

  if (!area) return <Navigate to="/our-expertise" replace />;

  return (
    <PageShell>
      <section style={{ position: "relative", overflow: "hidden", minHeight: 420 }}>
        <img
          src={area.image}
          alt={area.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, rgba(5,10,18,0.3) 0%, ${T.bg} 100%)`,
          }}
        />
        <div
          className="df-page-hero"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 860,
            margin: "0 auto",
            padding: "4rem 2rem 3rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.32rem 1rem",
              border: "0.5px solid rgba(0,212,255,0.25)",
              borderRadius: 100,
              background: "rgba(0,212,255,0.05)",
              fontSize: "0.67rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: T.cyan,
              fontWeight: 500,
              marginBottom: "1.25rem",
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>{area.icon}</span>
            Our Expertise
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(1.9rem,3.6vw,2.75rem)",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
              color: T.text,
            }}
          >
            {area.title}
          </h1>
          <p style={{ fontSize: "0.95rem", color: T.muted, lineHeight: 1.75, maxWidth: 600, margin: "0 auto", fontWeight: 300 }}>
            {area.tagline}
          </p>
        </div>
      </section>

      <div style={{ height: "0.5px", background: T.border }} />

      <section className="df-sec" style={{ padding: "4rem 2rem", maxWidth: 1000, margin: "0 auto" }}>
        <div className="df-expertise-detail-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "2.5rem", alignItems: "start" }}>
          <div style={{ textAlign: "left" }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "clamp(1.2rem,2vw,1.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: T.text,
                marginBottom: 16,
              }}
            >
              Overview
            </h2>
            <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>
              {area.description}
            </p>
            <h3
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: T.text,
                marginBottom: 14,
              }}
            >
              What we deliver
            </h3>
            <div style={{ display: "grid", gap: 10 }}>
              {area.bullets.map((b) => (
                <div
                  key={b}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: "1rem 1.1rem",
                    borderRadius: 12,
                    border: `0.5px solid ${T.border}`,
                    background: T.surface,
                    fontSize: "0.84rem",
                    color: T.muted,
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: T.cyan, marginTop: 2, flexShrink: 0 }}>›</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              borderRadius: 18,
              overflow: "hidden",
              border: `1px solid ${T.border}`,
              boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={area.image}
              alt={area.title}
              style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "1.25rem 1.35rem", background: T.surface, textAlign: "left" }}>
              <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: T.amber, fontWeight: 600, marginBottom: 6 }}>
                Capability Area
              </div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "0.95rem", fontWeight: 600, color: T.text }}>
                {area.title}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="df-cta" style={{ margin: "0 2rem 3rem", borderRadius: 14, background: T.surface, border: `0.5px solid ${T.border}`, padding: "3rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.2rem,2.2vw,1.65rem)", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 10, color: T.text }}>
          Ready to explore {area.title.toLowerCase()}?
        </h2>
        <p style={{ color: T.muted, fontSize: "0.9rem", marginBottom: "1.75rem" }}>
          Tell us about your goals and we'll outline a clear path forward.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/contact" style={{ background: T.cyan, color: "#050a12", padding: "0.75rem 1.75rem", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", fontWeight: 600, textDecoration: "none" }}>
            Start a Conversation
          </Link>
          <Link to="/our-expertise" style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, padding: "0.75rem 1.75rem", borderRadius: 8, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", textDecoration: "none" }}>
            View All Expertise
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
