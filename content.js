function isHomePage(url) {
  const urlObj = new URL(url);
  const path = urlObj.pathname;
  const params = urlObj.searchParams;
  // Redirect if model parameter is present or if on the main page
  return path === '/' || params.has('model');
}

function redirectToTemporaryChat() {
  const currentUrl = window.location.href;
  if (!currentUrl.includes('temporary-chat=true') && isHomePage(currentUrl)) {
    setTimeout(() => {
      location.replace('https://chatgpt.com/?temporary-chat=true');
    }, 1000);
  }
}

// Initial redirection
redirectToTemporaryChat();

// Observe URL changes for SPA navigation
const observer = new MutationObserver(() => {
  setTimeout(() => {
    redirectToTemporaryChat();
  }, 1000);
});

observer.observe(document, { childList: true, subtree: true });