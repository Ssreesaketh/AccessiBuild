const STYLE_ID = "accessibuild-profile-style";
const SETTINGS_STYLE_ID = "accessibuild-settings-style";
const STATE_KEY = "accessibuildActiveProfile";
const SETTINGS_KEY = "accessibuildSettings";
const CURSOR_TOKEN = "__ACCESSIBUILD_CURSOR__";

function removeStyle(id) {
  document.getElementById(id)?.remove();
}

function resolveProfileCss(css) {
  const cursorUrl = chrome.runtime.getURL("accessibuild-cursor.svg");
  return css.replaceAll(CURSOR_TOKEN, cursorUrl);
}

function applyProfile(profileKey) {
  removeStyle(STYLE_ID);
  const profile = globalThis.ACCESSIBILITY_PROFILES?.[profileKey];
  if (!profile || !profile.css) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.dataset.accessibuild = profileKey;
  style.textContent = resolveProfileCss(profile.css);
  (document.head || document.documentElement).appendChild(style);
}

function applySettings(settings = {}) {
  removeStyle(SETTINGS_STYLE_ID);
  const textScale = Number(settings.textScale || 100);
  const lineSpacing = Number(settings.lineSpacing || 100);
  const cursorSize = Number(settings.cursorSize || 64);
  const highContrast = Boolean(settings.highContrast);
  const reducedMotion = Boolean(settings.reducedMotion);
  const cursorUrl = chrome.runtime.getURL("accessibuild-cursor.svg");

  const style = document.createElement("style");
  style.id = SETTINGS_STYLE_ID;
  style.textContent = `
    html { font-size: ${textScale}% !important; }
    body, body * { cursor: url("${cursorUrl}") 4 2, auto !important; }
    body * { line-height: ${lineSpacing}% !important; }
    ${highContrast ? "html { filter: contrast(1.25) !important; }" : ""}
    ${reducedMotion ? "*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }" : ""}
    ${cursorSize > 64 ? `body, body * { cursor: url(\"${cursorUrl}\") 4 2, auto !important; }` : ""}
  `;
  (document.head || document.documentElement).appendChild(style);
}

function loadSavedState() {
  chrome.storage.local.get([STATE_KEY, SETTINGS_KEY], (result) => {
    applyProfile(result[STATE_KEY] || "normal");
    applySettings(result[SETTINGS_KEY] || {});
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "ACCESSIBUILD_APPLY_PROFILE") {
    applyProfile(message.profile);
    chrome.storage.local.set({ [STATE_KEY]: message.profile });
    sendResponse({ ok: true });
  }

  if (message?.type === "ACCESSIBUILD_APPLY_SETTINGS") {
    applySettings(message.settings);
    chrome.storage.local.set({ [SETTINGS_KEY]: message.settings });
    sendResponse({ ok: true });
  }

  if (message?.type === "ACCESSIBUILD_RESET") {
    applyProfile("normal");
    applySettings({});
    chrome.storage.local.set({ [STATE_KEY]: "normal", [SETTINGS_KEY]: {} });
    sendResponse({ ok: true });
  }

  if (message?.type === "ACCESSIBUILD_PAGE_SUMMARY") {
    sendResponse({
      ok: true,
      title: document.title,
      url: window.location.href,
      headings: [...document.querySelectorAll("h1, h2, h3")].slice(0, 20).map((node) => node.innerText.trim()).filter(Boolean),
      imagesWithoutAlt: document.querySelectorAll("img:not([alt])").length,
      buttons: document.querySelectorAll("button, [role='button']").length,
      links: document.querySelectorAll("a").length
    });
  }

  return true;
});

globalThis.ACCESSIBILITY_PROFILES = globalThis.ACCESSIBILITY_PROFILES || { normal: { css: "" } };
loadSavedState();
