# ♿ AccessiBuild

> **A more accessible web, one experience at a time.**

AccessiBuild is an accessibility-focused project that helps people interact with websites through **personalized accessibility profiles**. It combines a browser extension MVP with a Flask-based web application and a lightweight local page-analysis backend.

The browser extension allows users to apply accessibility-oriented visual and interaction adjustments directly to ordinary websites, while the local analyzer provides quick heuristic feedback about common accessibility concerns.

---

## ✨ Highlights

- 🎯 **Personalized accessibility profiles** for different user needs
- 🔤 **Readable typography and spacing** adjustments
- 🖱️ **Improved interaction targets** and visible keyboard focus
- 🎨 **Low-vision and easy-read styling**
- 🧘 **Reduced motion and distraction-oriented settings**
- 🔍 **Lightweight page analysis** using local heuristic checks
- 🔒 **Local-first analysis workflow** through a locally running Flask API
- 🧩 **Chrome / Edge Manifest V3 extension**
- ↩️ **One-click reset** to remove applied AccessiBuild changes

---

## 🧭 Project Structure

```text
AccessiBuild/
├── extension/                  # Browser extension MVP
│   ├── manifest.json           # Manifest V3 configuration
│   ├── popup.html              # Extension popup interface
│   ├── popup.css               # Popup styling
│   ├── popup.js                # Popup interactions and messaging
│   ├── profiles.js              # Accessibility profile definitions
│   ├── content.js               # Page-level style injection and actions
│   └── accessibuild-cursor.svg  # Custom cursor asset
│
├── api_analyze.py              # Local heuristic analysis API
├── app.py                      # Original Flask web application
├── *.html / *.css              # Existing accessibility demonstrations
└── README.md                   # Project documentation
```

---

## 🧩 Accessibility Profiles

The extension includes profile-based adjustments designed to support different browsing preferences and accessibility needs:

| Profile | Purpose |
|---|---|
| **Normal** | Default browsing experience without additional profile styling |
| **Low Vision** | Increases readability, spacing, contrast support, and focus visibility |
| **Dyslexia-Friendly** | Uses readable fonts and improved letter, word, and line spacing |
| **ADHD-Friendly** | Reduces motion and common visual distractions |
| **Autism / Sensory-Friendly** | Softens visual intensity and creates more breathing space in layouts |
| **Motor Support** | Enlarges common interaction targets and improves focus indicators |
| **Elder / Easy Read** | Uses larger text, calm colors, and clearer reading structure |
| **Photosensitive** | Reduces animations and motion-oriented visual effects |

> **Important:** These profiles are practical assistive styling presets. They are not a replacement for professional accessibility testing, assistive technology, or a complete WCAG audit.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ssreesaketh/AccessiBuild.git
cd AccessiBuild
```

### 2. Optional: Create a virtual environment

Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

Linux / macOS:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install backend dependencies

Install the Python packages used by the Flask application and analyzer. If a dependency file is added later, install it with:

```bash
pip install -r requirements.txt
```

For the current project, the backend uses Flask and the original web application also uses Requests and BeautifulSoup.

---

## 🧪 Run the Local Analysis Backend

From the project root, start the local analyzer:

```bash
python api_analyze.py
```

The analyzer runs on:

```text
http://127.0.0.1:5001
```

The extension sends a summarized representation of the active webpage to the `/api/analyze` endpoint.

### Current analysis checks

The MVP currently performs lightweight heuristic checks for:

- Images without an `alt` attribute
- Presence of headings
- Basic presence of buttons and links
- A keyboard-navigation recommendation

The result is intended as quick guidance rather than formal compliance certification.

---

## 🌐 Load the Browser Extension

AccessiBuild currently supports unpacked extension loading in Chromium-based browsers such as Chrome and Edge.

1. Start the analysis backend:

   ```bash
   python api_analyze.py
   ```

2. Open one of the following pages:

   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`

3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository's `extension` folder.
6. Open a normal public `http` or `https` webpage.
7. Open the AccessiBuild extension popup.
8. Select an accessibility profile.
9. Click **Apply profile**.
10. Use **Analyze page** to run the local heuristic analysis.
11. Use **Reset** whenever you want to remove AccessiBuild styling.

### Browser limitations

Content scripts cannot be injected into certain protected pages, including browser settings pages, extension stores, and some built-in browser pages. For testing, use ordinary public websites.

---

## 🏗️ High-Level Architecture

```text
┌──────────────────────────────┐
│       User opens webpage     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ AccessiBuild Browser Popup   │
│ Profile + settings controls  │
└──────────────┬───────────────┘
               │ Chrome messages
               ▼
┌──────────────────────────────┐
│ Content Script               │
│ Injects profile CSS          │
│ Applies / resets preferences │
└──────────────┬───────────────┘
               │ Page summary
               ▼
┌──────────────────────────────┐
│ Local Flask Analyzer         │
│ Rule-based heuristic checks  │
│ http://127.0.0.1:5001        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ Findings + recommendations   │
└──────────────────────────────┘
```

---

## 🔐 Privacy and Scope

- The extension is designed around applying styling locally in the browser.
- The current analyzer is intended to run against a local backend.
- The current MVP does **not** provide a complete accessibility certification system.
- Results should be manually reviewed and validated with keyboard navigation, screen readers, zoom, contrast tools, and real users where possible.

---

## 🛣️ Roadmap

Potential future improvements include:

- [ ] More comprehensive WCAG-oriented checks
- [ ] Automated alt-text assistance
- [ ] Voice navigation support
- [ ] Captioning and media accessibility features
- [ ] Adaptive personalization based on user preferences
- [ ] Improved dynamic-content handling with mutation observation
- [ ] Automated testing and CI workflows
- [ ] Extension packaging and release workflow
- [ ] More detailed accessibility reports and export options

These items represent possible future directions and are not all implemented in the current MVP.

---

## 🤝 Contributing

Contributions, suggestions, and accessibility testing feedback are welcome.

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes.
4. Test the extension on ordinary webpages.
5. Commit your changes:

   ```bash
   git add .
   git commit -m "Add your change"
   ```

6. Push your branch and open a pull request.

When contributing accessibility features, please document the intended user benefit and test the behavior with more than one type of webpage.

---

## 📄 License

A license has not yet been specified for this repository. Add an appropriate license before distributing the project publicly or accepting external contributions under defined terms.

---

## 🌟 Project Vision

AccessiBuild aims to make the web more adaptable by allowing users to shape their browsing experience around their own needs—not by forcing every user into the same interface, but by providing practical choices for clearer, calmer, and more usable interactions.

**Accessibility should be a feature of every digital experience, not an afterthought.**
