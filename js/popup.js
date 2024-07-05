document.getElementById("find-emails").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "findEmails" },
      (response) => {
        if (chrome.runtime.lastError) {
          return;
        }
        const emailsDiv = document.getElementById("emails");
        emailsDiv.innerHTML = "";
        if (response && response.length > 0) {
          response.forEach((email) => {
            const p = document.createElement("p");
            p.textContent = email;
            p.className = "text-sm text-gray-700";
            emailsDiv.appendChild(p);
          });
        } else {
          emailsDiv.textContent = "No emails found.";
          emailsDiv.className = "text-sm text-red-500";
        }
      }
    );
  });
});
