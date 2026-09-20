globalThis.ACCESSIBILITY_PROFILES = {
  normal: {
    name: "Normal",
    description: "Remove AccessiBuild modifications.",
    css: ""
  },
  low_vision: {
    name: "Low Vision",
    description: "Increase text size, contrast, and focus visibility.",
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
    description: "Use readable fonts and increased spacing.",
    css: `
      *, *::before, *::after { font-family: Arial, Verdana, sans-serif !important; }
      p, li { letter-spacing: 0.04em !important; word-spacing: 0.1em !important; line-height: 1.8 !important; }
      p { max-width: 65ch !important; }
    `
  },
  adhd: {
    name: "ADHD Focus",
    description: "Reduce motion and common visual distractions.",
    css: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      [class*="banner"], [class*="promo"], [class*="carousel"], [class*="slider"], [class*="ads"] { display: none !important; }
    `
  },
  autism: {
    name: "Sensory Friendly",
    description: "Reduce motion and soften visual intensity.",
    css: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      body { filter: saturate(0.75) brightness(1.02) !important; }
      p, li { line-height: 1.9 !important; }
      section, article, main, nav { margin-bottom: 1.4rem !important; }
    `
  },
  motor: {
    name: "Motor Support",
    description: "Increase interactive target sizes and focus visibility.",
    css: `
      a, button, input[type="button"], input[type="submit"], input[type="reset"] { min-height: 44px !important; padding: 10px 18px !important; }
      :focus { outline: 3px solid #2563eb !important; outline-offset: 3px !important; }
    `
  },
  elder: {
    name: "Easy Read",
    description: "Increase text size and line spacing.",
    css: `
      html { font-size: 118% !important; }
      body { background-color: #fdf6e3 !important; color: #111827 !important; }
      p, li { line-height: 1.9 !important; }
      a { text-decoration: underline !important; }
    `
  },
  photosensitive: {
    name: "No Motion",
    description: "Disable animations and transitions.",
    css: `
      *, *::before, *::after { animation: none !important; transition: none !important; }
      video[autoplay], [data-autoplay="true"] { visibility: hidden !important; }
      [class*="marquee"] { animation: none !important; }
    `
  }
};
