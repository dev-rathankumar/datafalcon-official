import { Link } from "react-router-dom";
import { T } from "../theme";
import Logo from "./Logo";

const FOOTER_LINKS = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop:`0.5px solid ${T.border}`, padding:"1.5rem 2rem" }}>
      <div className="df-fi" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <Logo height={40} />
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
