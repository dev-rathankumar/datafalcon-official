export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
      .df-a { font-size:0.78rem; color:#7a9bb5; text-decoration:none; transition:color 0.2s; }
      .df-a:hover { color:#e8f4fd; }
      .df-a.active { color:#00d4ff; }
      .df-fa { font-size:0.75rem; color:#2a4a6a; text-decoration:none; }
      .df-fa:hover { color:#7a9bb5; }
      @media (max-width:768px) {
        .df-nav-links { display:none !important; }
        .df-hero { height:auto !important; min-height:580px !important; }
        .df-hero-inner { padding:2.5rem 1.25rem 2rem !important; }
        .df-svc-grid { grid-template-columns:1fr !important; }
        .df-services-grid { grid-template-columns:1fr !important; }
        .df-sec { padding:2.5rem 1.25rem !important; }
        .df-page-hero { padding:2.5rem 1.25rem 2rem !important; }
        .df-stats { flex-wrap:wrap !important; }
        .df-stat { flex:1 1 45% !important; border-right:none !important; border-bottom:0.5px solid rgba(0,212,255,0.1) !important; }
        .df-stat:last-child { border-bottom:none !important; }
        .df-cta { margin:0 1rem 2rem !important; padding:2rem 1.25rem !important; }
        .df-fi { flex-direction:column !important; text-align:center !important; gap:12px !important; }
        .df-hbtns { flex-wrap:wrap !important; justify-content:center !important; }
        .df-industry-row { flex-direction:column !important; }
        .df-industry-visual { flex-basis:auto !important; width:100% !important; max-width:280px !important; margin:0 auto !important; }
        .df-challenge-grid { grid-template-columns:1fr !important; gap:1rem !important; }
        .df-case-grid { grid-template-columns:1fr !important; }
        .df-pillars-grid { grid-template-columns:repeat(2,1fr) !important; }
        .df-journey-flow { flex-direction:column !important; align-items:stretch !important; }
        .df-journey-arrow { display:none !important; }
        .df-arch-flow { flex-direction:column !important; align-items:center !important; }
        .df-arch-flow > div { flex-direction:column !important; }
        .df-arch-connector { transform:rotate(90deg) !important; }
        .df-arch-panel { width:100% !important; right:0 !important; top:auto !important; bottom:0 !important; height:80vh !important; border-left:none !important; border-top:0.5px solid rgba(0,212,255,0.1) !important; }
        .df-delivery-grid { grid-template-columns:1fr !important; }
      }
    `}</style>
  );
}
