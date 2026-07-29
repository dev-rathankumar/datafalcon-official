import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { T } from "../theme";

const EASE = [0.16, 1, 0.3, 1];

const CATEGORY_COLOR = {
  source: T.muted,
  ingest: T.cyan,
  storage: T.cyan,
  transform: T.cyan,
  process: T.cyan,
  "medallion-bronze": T.amber,
  "medallion-silver": T.muted,
  "medallion-gold": T.amber,
  consumption: T.cyan,
  ai: T.amber,
  governance: T.amber,
};

function colorFor(category) {
  return CATEGORY_COLOR[category] || T.cyan;
}

// ── NODE CHIP ─────────────────────────────────────────────────────────────────
function NodeChip({ node, selected, onClick }) {
  const accent = colorFor(node.category);
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      style={{
        width: 148, minHeight: 56, padding: "0.7rem 0.9rem", borderRadius: 9, cursor: "pointer",
        background: selected ? "rgba(0,212,255,0.10)" : T.surface,
        border: `0.5px solid ${selected ? "rgba(0,212,255,0.4)" : `${accent}55`}`,
        color: T.text, fontSize: "0.78rem", fontWeight: 600, fontFamily: "'Space Grotesk',sans-serif",
        textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center",
        lineHeight: 1.3, transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {node.label}
    </motion.button>
  );
}

// ── CONNECTOR ─────────────────────────────────────────────────────────────────
function Connector() {
  return (
    <div className="df-arch-connector" style={{ flexShrink: 0, color: T.dim, fontSize: "1.1rem", display: "flex", alignItems: "center" }}>
      <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
        →
      </motion.span>
    </div>
  );
}

// ── DETAIL ROW (side panel field) ────────────────────────────────────────────
function DetailField({ label, color, children }) {
  return (
    <div>
      <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color, fontWeight: 600, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

// ── SIDE PANEL ────────────────────────────────────────────────────────────────
function SidePanel({ node, onClose }) {
  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!node) return null;
  const accent = colorFor(node.category);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: "fixed", inset: 0, background: "rgba(5,10,18,0.6)", zIndex: 200 }}
      />
      <motion.div
        key="panel"
        className="df-arch-panel"
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{ position: "fixed", top: 0, right: 0, height: "100vh", width: "min(420px,92vw)", background: T.surface, borderLeft: `0.5px solid ${T.border}`, zIndex: 201, overflowY: "auto", padding: "1.75rem 1.5rem" }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.4rem" }}>
          <div>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", color: accent, fontWeight: 600, marginBottom: 6 }}>{node.category.replace("medallion-", "")}</div>
            <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "1.15rem", fontWeight: 700, color: T.text }}>{node.label}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            style={{ background: "transparent", border: `0.5px solid ${T.dim}`, color: T.muted, width: 30, height: 30, borderRadius: 6, cursor: "pointer", fontSize: "0.9rem", flexShrink: 0 }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "grid", gap: "1.2rem" }}>
          <DetailField label="Purpose" color={T.amber}>
            <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.65 }}>{node.detail.purpose}</p>
          </DetailField>
          <DetailField label="Role" color={T.cyan}>
            <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.65 }}>{node.detail.role}</p>
          </DetailField>
          <DetailField label="Best Practices" color={T.amber}>
            <div style={{ display: "grid", gap: 6 }}>
              {node.detail.bestPractices.map(b => (
                <div key={b} style={{ display: "flex", gap: 8, fontSize: "0.8rem", color: T.muted, lineHeight: 1.6 }}>
                  <span style={{ color: T.amber, flexShrink: 0 }}>›</span><span>{b}</span>
                </div>
              ))}
            </div>
          </DetailField>
          <DetailField label="How Data Falcon Implements It" color={T.cyan}>
            <p style={{ fontSize: "0.82rem", color: T.text, lineHeight: 1.65, fontWeight: 300 }}>{node.detail.implementation}</p>
          </DetailField>
          <DetailField label="Related Services" color={T.amber}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {node.detail.relatedServices.map(s => (
                <span key={s} style={{ fontSize: "0.7rem", color: T.muted, padding: "0.32rem 0.7rem", borderRadius: 100, border: `0.5px solid ${T.border}`, background: T.card, whiteSpace: "nowrap" }}>{s}</span>
              ))}
            </div>
          </DetailField>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── ARCHITECTURE EXPLORER ─────────────────────────────────────────────────────
export default function ArchitectureExplorer({ architectures }) {
  const [archIndex, setArchIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const arch = architectures[archIndex];

  const columns = useMemo(() => {
    const byCol = new Map();
    arch.nodes.forEach(n => {
      if (!byCol.has(n.col)) byCol.set(n.col, []);
      byCol.get(n.col).push(n);
    });
    return [...byCol.entries()].sort((a, b) => a[0] - b[0]).map(([, nodes]) => nodes);
  }, [arch]);

  const selectedNode = arch.nodes.find(n => n.id === selectedNodeId) || null;

  function selectArch(i) {
    setArchIndex(i);
    setSelectedNodeId(null);
  }

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: "2rem" }}>
        {architectures.map((a, i) => {
          const active = i === archIndex;
          return (
            <button
              key={a.id}
              onClick={() => selectArch(i)}
              style={{
                padding: "0.5rem 1.1rem", borderRadius: 100, cursor: "pointer", fontSize: "0.76rem", fontWeight: 600,
                fontFamily: "Inter,sans-serif", whiteSpace: "nowrap",
                border: active ? "0.5px solid rgba(0,212,255,0.4)" : `0.5px solid ${T.border}`,
                background: active ? "rgba(0,212,255,0.08)" : "transparent",
                color: active ? T.cyan : T.muted,
                transition: "background 0.2s, border-color 0.2s, color 0.2s",
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={arch.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <p style={{ textAlign: "center", color: T.muted, fontSize: "0.85rem", marginBottom: "1.75rem", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
            {arch.summary}
          </p>
          <div style={{ overflowX: "auto", padding: "0.5rem 0 1rem" }}>
            <div className="df-arch-flow" style={{ display: "flex", alignItems: "center", gap: "1.5rem", justifyContent: "center", minWidth: "min-content" }}>
              {columns.map((nodes, ci) => (
                <div key={ci} style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center" }}>
                    {nodes.map(node => (
                      <NodeChip key={node.id} node={node} selected={node.id === selectedNodeId} onClick={() => setSelectedNodeId(node.id)} />
                    ))}
                  </div>
                  {ci < columns.length - 1 && <Connector />}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <SidePanel node={selectedNode} onClose={() => setSelectedNodeId(null)} />
    </div>
  );
}
