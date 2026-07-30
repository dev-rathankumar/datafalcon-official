import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const VARIANTS = {
  up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -32 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
};

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
// Wrap any block to fade/slide/scale it in on scroll. Pass `stagger` to turn
// this into a stagger container for <RevealItem> children instead.
export default function Reveal({ as = "div", direction = "up", delay = 0, duration = 0.6, once = true, amount = 0.25, stagger, className, style, children }) {
  const Tag = motion[as] || motion.div;
  const variants = stagger
    ? { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }
    : VARIANTS[direction];
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      transition={stagger ? undefined : { duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

// Child of a stagger <Reveal>. Inherits "hidden"/"show" from the parent variants.
export function RevealItem({ as = "div", direction = "up", duration = 0.6, className, style, children }) {
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} style={style} variants={VARIANTS[direction]} transition={{ duration, ease: EASE }}>
      {children}
    </Tag>
  );
}
