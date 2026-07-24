import { Link, NavLink } from "react-router-dom";
import { T } from "../theme";

const NAV_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Industries", to: "#" },
  { label: "Our Work", to: "#" },
  { label: "About Us", to: "#" },
  { label: "Contact", to: "#" },
];

export default function Nav() {
  return (
    <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.1rem 2rem", borderBottom:`0.5px solid ${T.border}`, background:"rgba(5,10,18,0.97)", position:"sticky", top:0, zIndex:100 }}>
      <Link to="/" style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1.18rem", fontWeight:700, letterSpacing:"-0.02em", display:"flex", alignItems:"center", gap:8, textDecoration:"none" }}>
        <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
          <path d="M13 1L3 9l2.5 2L3 14l4.5-1-1 5L13 15l6.5 3-1-5 4.5 1-2.5-3 2.5-2L13 1z" fill="none" stroke="#00d4ff" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M13 1L7 11h12L13 1z" fill="rgba(0,212,255,0.12)" stroke="#00d4ff" strokeWidth="0.8"/>
        </svg>
        <span style={{ color:T.text }}>data</span><span style={{ color:T.cyan }}>falcon</span>
      </Link>
      <div className="df-nav-links" style={{ display:"flex", gap:"1.75rem" }}>
        {NAV_LINKS.map(l => (
          l.to === "#" ? (
            <a key={l.label} href="#" className="df-a">{l.label}</a>
          ) : (
            <NavLink key={l.label} to={l.to} className={({ isActive }) => `df-a${isActive ? " active" : ""}`}>{l.label}</NavLink>
          )
        ))}
      </div>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <button style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.46rem 1.1rem", borderRadius:5, fontSize:"0.75rem", fontFamily:"Inter,sans-serif", cursor:"pointer" }}
          onMouseEnter={e=>{e.target.style.borderColor=T.cyan;e.target.style.color=T.cyan;}}
          onMouseLeave={e=>{e.target.style.borderColor=T.dim;e.target.style.color=T.muted;}}>
          Schedule a Call
        </button>
        <button style={{ background:T.cyan, border:"none", color:"#050a12", padding:"0.46rem 1.2rem", borderRadius:5, fontSize:"0.75rem", fontFamily:"Inter,sans-serif", fontWeight:600, cursor:"pointer" }}>
          Let's Talk →
        </button>
      </div>
    </nav>
  );
}
