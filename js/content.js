chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "findEmails") {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = document.body.innerText.match(emailPattern) || [];
    sendResponse(emails);
  }
});
