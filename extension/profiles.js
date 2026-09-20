const COMMON_ACCESSIBILITY_CSS = `
  /* Shared improvements for every enhanced accessibility profile. */
  button, input[type="button"], input[type="submit"], input[type="reset"],
  select, textarea, summary {
    min-height: 44px !important;
    font-size: 1rem !important;
  }

  button, input[type="button"], input[type="submit"], input[type="reset"],
  a, select, summary {
    cursor: url("__ACCESSIBUILD_CURSOR__") 4 2, pointer !important;
  }

  body, body * {
    cursor: url("__ACCESSIBUILD_CURSOR__") 4 2, auto !important;
  }

  :focus-visible {
    outline: 3px solid #facc15 !important;
    outline-offset: 4px !important;
  }

  input, select, textarea {
    padding: 8px !important;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

globalThis.ACCESSIBILITY_PROFILES = {
  normal: {
    name: "Normal",
    description: "Remove AccessiBuild modifications.",
    css: ""
  },
  low_vision: {
    name: "Low Vision",
    description: "Increase text size, contrast, focus visibility, cursor visibility, and control sizes.",
    css: `
      html { font-size: 112.5% !important; }
      body { filter: contrast(1.12) !important; }
      p, li, a, span, input, button, label { line-height: 1.7 !important; }
      a { text-decoration: underline !important; }
      :focus { outline: 3px solid #facc15 !important; outline-offset: 3px !important; }
    `
  },
  dyslexia: {
    name: "Dyslexia Friendly",
    description: "Use readable fonts, increased spacing, and larger controls.",
    css: `
      *, *::before, *::after { font-family: Arial, Verdana, sans-serif !important; }
      p, li { letter-spacing: 0.04em !important; word-spacing: 0.1em !important; line-height: 1.8 !important; }
      p { max-width: 65ch !important; }
    `
  },
  adhd: {
    name: "ADHD Focus",
    description: "Reduce motion, visual distractions, and improve control usability.",
    css: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      [class*="banner"], [class*="promo"], [class*="carousel"], [class*="slider"], [class*="ads"] { display: none !important; }
    `
  },
  autism: {
    name: "Sensory Friendly",
    description: "Reduce motion, soften visual intensity, and enlarge controls.",
    css: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      body { filter: saturate(0.75) brightness(1.02) !important; }
      p, li { line-height: 1.9 !important; }
      section, article, main, nav { margin-bottom: 1.4rem !important; }
    `
  },
  motor: {
    name: "Motor Support",
    description: "Increase interactive target sizes, cursor visibility, and focus visibility.",
    css: `
      a, button, input[type="button"], input[type="submit"], input[type="reset"] { min-height: 48px !important; min-width: 48px !important; padding: 12px 20px !important; }
      :focus { outline: 3px solid #2563eb !important; outline-offset: 3px !important; }
    `
  },
  elder: {
    name: "Easy Read",
    description: "Increase text size, spacing, and readable contrast while preserving control colors.",
    css: `
      html { font-size: 118% !important; }
      html, body { background-color: #fdf6e3 !important; }
      body { color: #111827 !important; }
      p, li, h1, h2, h3, h4, h5, h6, blockquote, figcaption, label {
        color: #111827 !important;
      }
      a { color: #0645ad !important; text-decoration: underline !important; }
      p, li { line-height: 1.9 !important; }
      button, input, select, textarea, [role="button"] {
        color: revert !important;
      }
    `
  },
  photosensitive: {
    name: "No Motion",
    description: "Disable animations and transitions while improving control usability.",
    css: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      video[autoplay], [data-autoplay="true"] { visibility: hidden !important; }
      [class*="marquee"] { animation: none !important; }
    `
  }
};

for (const [profileKey, profile] of Object.entries(globalThis.ACCESSIBILITY_PROFILES)) {
  if (profileKey !== "normal") {
    profile.css = COMMON_ACCESSIBILITY_CSS + profile.css;
  }
}
