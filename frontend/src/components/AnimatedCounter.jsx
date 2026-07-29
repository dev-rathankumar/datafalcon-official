import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// ── ANIMATED COUNTER ─────────────────────────────────────────────────────────
// Counts up to the leading number in `value` once it scrolls into view.
// Non-numeric strings (or suffixes like "+", "%", "/7") pass through as-is.
export default function AnimatedCounter({ value, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = String(value).match(/^(\d+)(.*)$/);
  const numeric = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 18 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView && numeric !== null) motionVal.set(numeric);
  }, [inView, numeric, motionVal]);

  useEffect(() => {
    const unsub = spring.on("change", v => setDisplay(Math.round(v)));
    return unsub;
  }, [spring]);

  if (numeric === null) {
    return <span ref={ref} style={style}>{value}</span>;
  }
  return <span ref={ref} style={style}>{display}{suffix}</span>;
}
