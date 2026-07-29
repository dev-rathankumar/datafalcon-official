import { T } from "../theme";

export default function SecondaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", cursor: "pointer", ...style }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.muted; e.currentTarget.style.color = T.text; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.dim; e.currentTarget.style.color = T.muted; }}
    >
      {children}
    </button>
  );
}
