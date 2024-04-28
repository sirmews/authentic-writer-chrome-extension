const storageKeys = [
  "backspaceCount",
  "copyCount",
  "pasteCount",
  "arrowCount",
  "undoCount",
];

/**
 * On document load, get the stored values of backspace, copy, and paste counts
 * Also attach an event listener to the clear button
 */
document.addEventListener("DOMContentLoaded", async function () {
  const storageValues = await chrome.storage.sync.get(storageKeys);

  Object.keys(storageValues).forEach((key) => {
    document.getElementById(key).textContent = storageValues[key] || "0";
  });

  // We have to do this because of Chrome's Content Security Policy
  // It doesn't allow inline JavaScript, specifically the onclick attribute
  document.getElementById("clearButton").addEventListener("click", clearStats);
});

/**
 * Clear the stored values of backspace, copy, and paste counts
 */
async function clearStats() {
  const setDefaultValues = storageKeys.reduce((acc, key) => {
    document.getElementById(key).textContent = "0";
    acc[key] = 0;
    return acc;
  }, {});

  await chrome.storage.sync.set(setDefaultValues);
}
