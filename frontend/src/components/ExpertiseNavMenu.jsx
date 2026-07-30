import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Database,
  BrainCircuit,
  Code2,
  Workflow,
  Cloud,
  ChevronDown,
} from "lucide-react";
import { T } from "../theme";
import { EXPERTISE_AREAS } from "../data/expertiseAreas";

const AREA_ICONS = {
  "agentic-ai-systems": Bot,
  "data-engineering": Database,
  "machine-learning-ai": BrainCircuit,
  "software-development": Code2,
  "api-automation": Workflow,
  "cloud-solutions": Cloud,
};

function MegaMenuItem({ area, active, onNavigate }) {
  const [hovered, setHovered] = useState(false);
  const Icon = AREA_ICONS[area.slug];

  return (
    <Link
      to={`/our-expertise/${area.slug}`}
      onClick={onNavigate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        padding: "0.85rem 0.75rem",
        borderRadius: 12,
        textDecoration: "none",
        background: hovered || active ? "rgba(0,212,255,0.04)" : "transparent",
        transition: "background 0.15s ease",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          flexShrink: 0,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(13,26,42,0.95)",
          border: "1px solid rgba(0,212,255,0.12)",
          color: T.text,
        }}
      >
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <div style={{ minWidth: 0, paddingTop: 2 }}>
        <div
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: active || hovered ? T.amber : T.amber,
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {area.title}
        </div>
        <div style={{ fontSize: "0.72rem", color: T.muted, lineHeight: 1.45 }}>
          {area.menuDesc}
        </div>
      </div>
    </Link>
  );
}

export default function ExpertiseNavMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const isActive = location.pathname.startsWith("/our-expertise");

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerColor = open || isActive ? T.amber : "#e8f4fd";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        className="df-expertise-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "inherit",
          fontSize: "0.78rem",
          fontWeight: open || isActive ? 500 : 400,
          color: triggerColor,
          transition: "color 0.2s ease",
        }}
      >
        Our Expertise
        <ChevronDown
          size={14}
          strokeWidth={2}
          style={{
            transition: "transform 0.25s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: triggerColor,
          }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="df-expertise-mega"
            style={{
              position: "absolute",
              top: "calc(100% + 18px)",
              left: "50%",
              marginLeft: -300,
              width: 800,
              padding: "1.35rem 1.25rem",
              borderRadius: 18,
              border: "1px solid rgba(0,212,255,0.1)",
              background: "rgba(13,22,36,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
              zIndex: 200,
              textAlign: "left",
            }}
          >
            <div
              className="df-expertise-mega-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "0.5rem",
                rowGap: "0.25rem",
              }}
            >
              {EXPERTISE_AREAS.map((area) => (
                <MegaMenuItem
                  key={area.slug}
                  area={area}
                  active={location.pathname === `/our-expertise/${area.slug}`}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
