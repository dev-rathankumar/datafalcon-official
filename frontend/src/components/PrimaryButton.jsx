import { T } from "../theme";

export default function PrimaryButton({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      style={{ background: T.cyan, border: "none", color: "#050a12", padding: "0.75rem 1.75rem", borderRadius: 5, fontSize: "0.85rem", fontFamily: "Inter,sans-serif", fontWeight: 600, cursor: "pointer", ...style }}
    >
      {children}
    </button>
  );
}
