/**
 * IncogGPT - Automatically enables temporary chat mode in ChatGPT
 * 
 * This content script automatically redirects to the temporary chat URL
 * when a user opens ChatGPT.
 */

// Function to check if we're already on a temporary chat page
function isTemporaryChatUrl() {
  return window.location.href.includes('temporary-chat=true');
}

// Function to redirect to temporary chat URL
function redirectToTemporaryChat() {
  if (!isTemporaryChatUrl()) {
    console.log('IncogGPT: Redirecting to temporary chat URL...');
    // Use location.replace instead of location.href to avoid adding to browser history
    window.location.replace('https://chatgpt.com/?temporary-chat=true');
  } else {
    console.log('IncogGPT: Already on temporary chat page');
  }
}

// Add a small delay before initial redirect to ensure the page is fully loaded
setTimeout(() => {
  redirectToTemporaryChat();
}, 100);

// Also listen for navigation changes (for SPA navigation)
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl && !isTemporaryChatUrl()) {
    lastUrl = currentUrl;
    console.log('IncogGPT: URL changed, checking if redirect needed...');
    
    // Wait a moment for the page to load after navigation
    setTimeout(() => {
      redirectToTemporaryChat();
    }, 500);
  }
});

// Start observing URL changes
urlObserver.observe(document, { subtree: true, childList: true });