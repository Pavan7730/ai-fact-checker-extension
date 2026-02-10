document.getElementById("scanBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => document.body.innerText
    },
    async (results) => {
      const pageText = results[0].result;
      document.getElementById("output").textContent =
        "Page text captured.\nLength: " + pageText.length;
    }
  );
});
