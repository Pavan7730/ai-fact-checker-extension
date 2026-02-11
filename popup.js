document.getElementById("scanBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => document.body.innerText
    },
    async (results) => {
      const pageText = results[0].result;

      const response = await fetch("http://localhost:3000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ pageText })
      });

      const data = await response.json();
      alert(data.message);
    }
  );
});
