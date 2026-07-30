import { T } from "../theme";

export default function Footer() {
  return (
    <footer style={{ borderTop:`0.5px solid ${T.border}`, padding:"1.5rem 2rem" }}>
      <div className="df-fi" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"1rem", fontWeight:700 }}>
          data<span style={{ color:T.cyan }}>falcon</span>.io
        </div>
        <div style={{ display:"flex", gap:"1.5rem" }}>
          {["Privacy","Terms","Contact","LinkedIn"].map(l => (
            <a key={l} href="#" className="df-fa">{l}</a>
          ))}
        </div>
        <div style={{ fontSize:"0.72rem", color:T.dim }}>© 2026 Datafalcon. India · Global Clients.</div>
      </div>
    </footer>
  );
}
