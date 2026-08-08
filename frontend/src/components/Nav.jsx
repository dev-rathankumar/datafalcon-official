import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { T } from "../theme";
import ExpertiseNavMenu from "./ExpertiseNavMenu";
import Logo from "./Logo";
import { EXPERTISE_AREAS } from "../data/expertiseAreas";

const NAV_LINKS = [
  { label: "Our Work", to: "/our-work" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function MobileNav({ open, onClose }) {
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const location = useLocation();
  const isFirstPath = useRef(true);

  useEffect(() => {
    if (isFirstPath.current) {
      isFirstPath.current = false;
      return;
    }
    onClose();
    setExpertiseOpen(false);
  }, [location.pathname, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5,10,18,0.75)",
              backdropFilter: "blur(4px)",
              zIndex: 150,
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="df-mobile-nav"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(320px, 88vw)",
              background: "rgba(10,20,34,0.98)",
              borderLeft: `0.5px solid ${T.border}`,
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
              padding: "1.25rem 1.25rem 2rem",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  background: "transparent",
                  border: `0.5px solid ${T.dim}`,
                  borderRadius: 8,
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: T.muted,
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "left" }}>
              <button
                type="button"
                onClick={() => setExpertiseOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0.85rem 0.75rem",
                  background: "transparent",
                  border: "none",
                  color: location.pathname.startsWith("/our-expertise") ? T.amber : T.text,
                  fontFamily: "inherit",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderRadius: 8,
                }}
              >
                Our Expertise
                <ChevronDown
                  size={16}
                  style={{
                    transition: "transform 0.25s ease",
                    transform: expertiseOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: T.muted,
                  }}
                />
              </button>

              <AnimatePresence initial={false}>
                {expertiseOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: "hidden", paddingLeft: 8 }}
                  >
                    {EXPERTISE_AREAS.map((area) => (
                      <Link
                        key={area.slug}
                        to={`/our-expertise/${area.slug}`}
                        onClick={onClose}
                        style={{
                          display: "block",
                          padding: "0.65rem 0.75rem",
                          fontSize: "0.82rem",
                          color: location.pathname === `/our-expertise/${area.slug}` ? T.cyan : T.muted,
                          textDecoration: "none",
                          borderRadius: 6,
                        }}
                      >
                        {area.title}
                      </Link>
                    ))}
                    <Link
                      to="/our-expertise"
                      onClick={onClose}
                      style={{
                        display: "block",
                        padding: "0.65rem 0.75rem",
                        fontSize: "0.78rem",
                        color: T.cyan,
                        textDecoration: "none",
                      }}
                    >
                      View all expertise →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={onClose}
                  className={({ isActive }) => `df-mobile-link${isActive ? " active" : ""}`}
                  style={{
                    display: "block",
                    padding: "0.85rem 0.75rem",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: T.text,
                    textDecoration: "none",
                    borderRadius: 8,
                  }}
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>

            <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
              <Link
                to="/contact"
                onClick={onClose}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: T.cyan,
                  color: "#050a12",
                  padding: "0.75rem 1.25rem",
                  borderRadius: 8,
                  fontSize: "0.85rem",
                  fontFamily: "Inter,sans-serif",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Schedule a Call
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.5rem 2rem", borderBottom:`0.5px solid ${T.border}`, background:"rgba(5,10,18,0.97)", position:"sticky", top:0, zIndex:100 }}>
        <Logo height={70} />

        <div className="df-nav-links" style={{ display:"flex", gap:"1.75rem", alignItems:"center" }}>
          <ExpertiseNavMenu />
          {NAV_LINKS.map((l) => (
            <NavLink key={l.label} to={l.to} className={({ isActive }) => `df-a${isActive ? " active" : ""}`}>{l.label}</NavLink>
          ))}
        </div>

        <div className="df-nav-actions" style={{ display:"flex", gap:10, alignItems:"center" }}>
          <Link
            to="/contact"
            className="df-nav-cta"
            style={{ background:"transparent", border:`0.5px solid ${T.dim}`, color:T.muted, padding:"0.46rem 1.1rem", borderRadius:5, fontSize:"0.75rem", fontFamily:"Inter,sans-serif", cursor:"pointer", textDecoration:"none" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.cyan;e.currentTarget.style.color=T.cyan;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.dim;e.currentTarget.style.color=T.muted;}}
          >
            Schedule a Call
          </Link>

          <button
            type="button"
            className="df-nav-hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
