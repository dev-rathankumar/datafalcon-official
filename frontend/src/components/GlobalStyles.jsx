export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.2;} }
      @keyframes whyGlowDrift {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        50% { transform: translate(30px, -20px) scale(1.08); opacity: 0.75; }
      }
      .df-why-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }
      .df-why-grid-lines {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse 75% 65% at 50% 45%, black 10%, transparent 75%);
        -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 45%, black 10%, transparent 75%);
      }
      .df-why-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(80px);
        animation: whyGlowDrift 12s ease-in-out infinite;
      }
      .df-why-glow--cyan {
        width: 420px;
        height: 420px;
        top: -10%;
        left: 15%;
        background: rgba(0,212,255,0.06);
      }
      .df-why-glow--amber {
        width: 360px;
        height: 360px;
        bottom: -5%;
        right: 10%;
        background: rgba(245,166,35,0.04);
        animation-delay: -6s;
      }
      .df-why-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
      }
      .df-input:focus {
        outline: none;
        border-color: rgba(0,212,255,0.35) !important;
        box-shadow: 0 0 0 3px rgba(0,212,255,0.08);
      }
      .df-input::placeholder { color: rgba(122,155,181,0.45); }
      select.df-input option { background: #0a1422; color: #e8f4fd; }
      html { scroll-padding-top: 0rem; }
      #contact-form {
        scroll-margin-top: 3.5rem;
      }
      .df-expertise-trigger:hover { color: #f5a623 !important; }
      .df-a { font-size:0.78rem; color:#7a9bb5; text-decoration:none; transition:color 0.2s; }
      .df-a:hover { color:#e8f4fd; }
      .df-a.active { color:#00d4ff; }
      .df-fa { font-size:0.75rem; color:#2a4a6a; text-decoration:none; }
      .df-fa:hover { color:#7a9bb5; }
      .df-nav-hamburger { display:none; align-items:center; justify-content:center; background:transparent; border:0.5px solid #2a4a6a; border-radius:8px; width:38px; height:38px; color:#7a9bb5; cursor:pointer; padding:0; }
      .df-nav-hamburger:hover { border-color:#00d4ff; color:#00d4ff; }
      .df-mobile-link.active { color: #00d4ff !important; }
      @media (max-width:768px) {
        .df-nav-links { display:none !important; }
        .df-nav-cta { display:none !important; }
        .df-nav-hamburger { display:flex !important; }
        nav { padding:1rem 1.25rem !important; }
        .df-hero { height:auto !important; min-height:580px !important; }
        .df-hero-inner { padding:2.5rem 1.25rem 2rem !important; }
        .df-svc-grid { grid-template-columns:1fr !important; }
        .df-services-grid { grid-template-columns:1fr !important; }
        .df-expertise-grid { grid-template-columns:1fr !important; }
        .df-sec { padding:2.5rem 1.25rem !important; }
        .df-page-hero { padding:2.5rem 1.25rem 2rem !important; }
        .df-hero-tagline { padding:1.15rem 1.25rem !important; min-height:68px !important; }
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
        .df-why { padding:3.5rem 1.25rem !important; }
        .df-why-grid { grid-template-columns:1fr !important; gap:1rem !important; }
        .df-expertise-mega {
          width: calc(100vw - 2.5rem) !important;
          margin-left: 0 !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        .df-expertise-mega-grid { grid-template-columns: 1fr !important; }
        .df-contact-grid { grid-template-columns:1fr !important; gap:2.5rem !important; }
        .df-contact-form-row { grid-template-columns:1fr !important; }
        .df-contact-steps { grid-template-columns:1fr !important; }
        .df-contact-main { padding:3rem 1.25rem !important; }
        .df-team-row { flex-direction:column !important; }
        .df-team-photo { flex: none !important; width:100% !important; min-height:280px !important; }
        .df-team-content { padding:1.5rem !important; }
      }
    `}</style>
  );
}
