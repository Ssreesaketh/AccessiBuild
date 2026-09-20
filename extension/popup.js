const BACKEND_URL = "http://127.0.0.1:5001";
const PROFILE_KEY = "accessibuildActiveProfile";

const profileSelect = document.getElementById("profile");
const statusElement = document.getElementById("status");
const analysisElement = document.getElementById("analysis");

function setStatus(message, isError = false) {
  statusElement.textContent = message;
  statusElement.style.color = isError ? "#fca5a5" : "#86efac";
}

function getActiveTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) {
        reject(new Error("No active tab was found."));
        return;
      }
      resolve(tab);
    });
  });
}

function sendToTab(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      if (!response?.ok) {
        reject(new Error("The page did not respond correctly."));
        return;
      }
      resolve(response);
    });
  });
}

async function applyProfile(profile) {
  const tab = await getActiveTab();
  await sendToTab(tab.id, {
    type: "ACCESSIBUILD_APPLY_PROFILE",
    profile
  });
  await chrome.storage.local.set({ [PROFILE_KEY]: profile });
  setStatus(`Applied: ${profileSelect.options[profileSelect.selectedIndex].text}`);
}

document.getElementById("apply").addEventListener("click", async () => {
  try {
    await applyProfile(profileSelect.value);
  } catch (error) {
    setStatus(`Could not apply profile: ${error.message}`, true);
  }
});

document.getElementById("reset").addEventListener("click", async () => {
  try {
    const tab = await getActiveTab();
    await sendToTab(tab.id, { type: "ACCESSIBUILD_RESET" });
    profileSelect.value = "normal";
    await chrome.storage.local.set({ [PROFILE_KEY]: "normal" });
    setStatus("AccessiBuild changes were reset.");
  } catch (error) {
    setStatus(`Could not reset page: ${error.message}`, true);
  }
});

document.getElementById("analyze").addEventListener("click", async () => {
  analysisElement.hidden = false;
  analysisElement.textContent = "Analyzing...";

  try {
    const tab = await getActiveTab();
    const summary = await sendToTab(tab.id, {
      type: "ACCESSIBUILD_PAGE_SUMMARY"
    });

    const response = await fetch(`${BACKEND_URL}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(summary)
    });

    if (!response.ok) {
      throw new Error(`Backend returned HTTP ${response.status}`);
    }

    const result = await response.json();
    analysisElement.textContent = JSON.stringify(result, null, 2);
    setStatus("Accessibility analysis completed.");
  } catch (error) {
    analysisElement.textContent = "Analysis is not available.\n\n" + error.message;
    setStatus("Analysis backend unavailable.", true);
  }
});

chrome.storage.local.get([PROFILE_KEY], (result) => {
  profileSelect.value = result[PROFILE_KEY] || "normal";
});
