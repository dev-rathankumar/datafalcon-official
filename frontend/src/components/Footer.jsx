import { Link } from "react-router-dom";
import { T } from "../theme";

const FOOTER_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop:`0.5px solid ${T.border}`, padding:"1.5rem 2rem" }}>
      <div className="df-fi" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <Link to="/" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1rem", fontWeight:700, textDecoration:"none", color:"inherit" }}>
          Kaizen<span style={{ color:T.cyan }}> Agentics</span>
        </Link>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link key={label} to={to} className="df-fa">{label}</Link>
          ))}
        </div>
        <div style={{ fontSize:"0.72rem", color:T.dim }}>© 2026 Kaizen Agentics.</div>
      </div>
    </footer>
  );
}
