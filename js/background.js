chrome.tabs.onActivated.addListener((activeInfo) => {
  let tabId = activeInfo.tabId;
  publishTabEvent(tabId);
});

chrome.tabs.onUpdated.addListener((tabId) => {
  publishTabEvent(tabId);
});


function publishTabEvent(tabId) {
  if (!tabId) return;
  chrome.tabs.executeScript(tabId, { file: 'js/content.js' }, () => {
    chrome.tabs.sendMessage(tabId, true);
  });
}

// context button
chrome.contextMenus.create({
  "id": "menu",
  "title": "Add image",
  "contexts": ["image"]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info || !info.srcUrl) {
    return;
  }

  chrome.storage.local.get('images', (result) => {
    let arrayImages = [];
    if (result.images) {
      arrayImages = result.images;
    }
    arrayImages.push(info.srcUrl);
    chrome.storage.local.set({ 'images': arrayImages });
  });
});