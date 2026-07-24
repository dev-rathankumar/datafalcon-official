import { useEffect, useRef } from "react";

// ── PARTICLE NETWORK CANVAS ──────────────────────────────────────────────────
export default function ParticleNet() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const DPR = window.devicePixelRatio || 1;
    let W, H, dots, frame = 0;

    function init() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.max(Math.floor((W * H) / 9000), 60);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        type: Math.random() < 0.65 ? 0 : Math.random() < 0.7 ? 1 : 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.015,
        hub: Math.random() < 0.12,
      }));
    }

    function dotRGBA(type, alpha) {
      if (type === 0) return `rgba(0,212,255,${alpha})`;
      if (type === 1) return `rgba(245,166,35,${alpha})`;
      return `rgba(180,220,255,${alpha})`;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // subtle grid
      ctx.strokeStyle = "rgba(0,212,255,0.03)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // move dots
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.pulse += d.pulseSpeed;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      });

      // connections
      const MAX_DIST = 130;
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        for (let j = i + 1; j < dots.length; j++) {
          const b = dots[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const s = 1 - dist / MAX_DIST;
            const useAmber = (a.type === 1 || b.type === 1) && !(a.type === 0 && b.type === 0);
            const la = s * (a.hub || b.hub ? 0.55 : 0.22);
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = useAmber ? `rgba(245,166,35,${la})` : `rgba(0,212,255,${la})`;
            ctx.lineWidth = s * (a.hub || b.hub ? 1.2 : 0.7);
            ctx.stroke();
          }
        }
      }

      // draw dots
      dots.forEach(d => {
        const pf = 0.5 + 0.5 * Math.sin(d.pulse);
        const r = d.hub ? d.r * 2.2 : d.r;
        const ba = d.hub ? 0.9 : 0.6 + pf * 0.3;

        // glow for hubs / amber
        if (d.hub || d.type === 1) {
          const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 5);
          g.addColorStop(0, dotRGBA(d.type, d.hub ? 0.4 : 0.22));
          g.addColorStop(1, "transparent");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(d.x, d.y, r * 5, 0, Math.PI * 2); ctx.fill();
        }

        // pulse ring on hubs
        if (d.hub) {
          ctx.beginPath(); ctx.arc(d.x, d.y, r + pf * 8, 0, Math.PI * 2);
          ctx.strokeStyle = dotRGBA(d.type, 0.28 * (1 - pf * 0.5));
          ctx.lineWidth = 0.8; ctx.stroke();
        }

        // core
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dotRGBA(d.type, ba); ctx.fill();

        // white center on hubs
        if (d.hub) {
          ctx.beginPath(); ctx.arc(d.x, d.y, r * 0.38, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.85)"; ctx.fill();
        }
      });

      // travelling packets between hub nodes
      const hubs = dots.filter(d => d.hub).slice(0, 8);
      for (let h = 0; h < hubs.length - 1; h++) {
        const a = hubs[h], b = hubs[h + 1];
        const dx = a.x - b.x, dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < 280) {
          const t = (frame * 0.008 + h * 0.37) % 1;
          const px = a.x + (b.x - a.x) * t;
          const py = a.y + (b.y - a.y) * t;
          const col = h % 2 === 0 ? "0,212,255" : "245,166,35";
          const pg = ctx.createRadialGradient(px, py, 0, px, py, 8);
          pg.addColorStop(0, `rgba(${col},0.9)`); pg.addColorStop(1, "transparent");
          ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${col})`; ctx.fill();
        }
      }

      frame++;
      rafRef.current = requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => {
      cancelAnimationFrame(rafRef.current);
      init();
      draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}
