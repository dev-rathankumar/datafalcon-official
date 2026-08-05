import { Link } from "react-router-dom";
import { T } from "../theme";
import PageShell from "./PageShell";

const h2 = {
  fontFamily: "'Space Grotesk',sans-serif",
  fontSize: "1.05rem",
  fontWeight: 600,
  color: T.text,
  marginBottom: 10,
  marginTop: 0,
};

const p = {
  fontSize: "0.88rem",
  color: T.muted,
  lineHeight: 1.75,
  margin: "0 0 10px",
};

const ul = {
  fontSize: "0.88rem",
  color: T.muted,
  lineHeight: 1.75,
  paddingLeft: "1.25rem",
  margin: "0 0 10px",
};

export function Section({ title, children }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2 style={h2}>{title}</h2>
      {children}
    </section>
  );
}

export function P({ children }) {
  return <p style={p}>{children}</p>;
}

export function List({ items }) {
  return (
    <ul style={ul}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function LegalPage({ title, children }) {
  return (
    <PageShell>
      <article style={{ maxWidth: 780, margin: "0 auto", padding: "3.5rem 2rem 4rem", textAlign: "left" }}>
        <p style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: T.cyan, fontWeight: 600, marginBottom: 12 }}>
          Legal
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: T.text, marginBottom: 8, letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        <p style={{ fontSize: "0.82rem", color: T.dim, marginBottom: "2.5rem" }}>
          Last updated: December 15, 2025
        </p>
        {children}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: `0.5px solid ${T.border}` }}>
          <P>
            Questions? Contact{" "}
            <a href="mailto:support@kaizenagentics.com" style={{ color: T.cyan, textDecoration: "none" }}>
              support@kaizenagentics.com
            </a>
            {" "}or visit our{" "}
            <Link to="/contact" style={{ color: T.cyan, textDecoration: "none" }}>contact page</Link>.
          </P>
        </div>
      </article>
    </PageShell>
  );
}
