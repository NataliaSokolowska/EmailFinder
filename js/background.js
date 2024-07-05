chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "findEmails") {
    chrome.scripting.executeScript(
      {
        target: { tabId: sender.tab.id },
        function: findEmails,
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          sendResponse([]);
        } else {
          sendResponse(results[0].result);
        }
      }
    );
    return true;
  } else if (message.action === "test") {
    sendResponse({ message: "Test message received" });
  }
});

function findEmails() {
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const emails = document.body.innerText.match(emailPattern) || [];
  return emails;
}
