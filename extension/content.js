const STYLE_ID = "accessibuild-profile-style";
const STATE_KEY = "accessibuildActiveProfile";

function removeAccessiBuildStyles() {
  document.getElementById(STYLE_ID)?.remove();
}

function applyProfile(profileKey) {
  removeAccessiBuildStyles();
  const profile = globalThis.ACCESSIBILITY_PROFILES?.[profileKey];
  if (!profile || !profile.css) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.dataset.accessibuild = profileKey;
  style.textContent = profile.css;
  (document.head || document.documentElement).appendChild(style);
}

function loadProfileFromStorage() {
  chrome.storage.local.get([STATE_KEY], (result) => {
    applyProfile(result[STATE_KEY] || "normal");
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "ACCESSIBUILD_APPLY_PROFILE") {
    applyProfile(message.profile);
    chrome.storage.local.set({ [STATE_KEY]: message.profile });
    sendResponse({ ok: true });
  }

  if (message?.type === "ACCESSIBUILD_RESET") {
    applyProfile("normal");
    chrome.storage.local.set({ [STATE_KEY]: "normal" });
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

// Profiles are injected by profiles.js through the popup message bundle.
// The fallback style map keeps the content script safe when loaded alone.
globalThis.ACCESSIBILITY_PROFILES = globalThis.ACCESSIBILITY_PROFILES || {
  normal: { css: "" }
};

loadProfileFromStorage();
