chrome.tabs.onActivated.addListener((activeInfo) => {
  let tabId = activeInfo.tabId;
  changeImages(tabId);
});

chrome.tabs.onUpdated.addListener((tabId) => {
  changeImages(tabId);
});


function executeScript(tabId, callback) {
  if (!tabId) return;
  chrome.tabs.executeScript(tabId, { file: 'js/content.js' }, () => callback());
}

function changeImages(tabId) {
  executeScript(tabId, () => {
    chrome.storage.local.get('images', (result) => {
      if (!result || !result.images || result.images.length == 0) return;

      let message = {
        images: result.images
      };

      // send images to content.js
      chrome.tabs.sendMessage(tabId, message);
    });
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