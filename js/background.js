function executeScript(tabId, callback) {
  if (!tabId) return;
  chrome.tabs.executeScript(tabId, { file: 'js/content.js' }, () => callback());
}

function changeImages(tabId) {

  executeScript(tabId, function () {
    // Receive message from content.js
    chrome.runtime.onMessage.addListener((message) => {
      console.log(message);
    });

    chrome.storage.local.get('images', (result) => {
      if (!result || !result.images || result.images.length == 0) return;

      var message = {
        images: result.images
      };

      // Send images to the content.js
      chrome.tabs.sendMessage(tabId, message, (request) => {
        console.log('Total replaced images: ' + request.imgArraySize);
      });

    });
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  var tabId = activeInfo.tabId;
  changeImages(tabId);
});

chrome.tabs.onUpdated.addListener((tabId) => {
  changeImages(tabId);
});

// right click menu
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
    var arrayImages = [];
    if (result.images) {
      arrayImages = result.images;
    }
    arrayImages.push(info.srcUrl);
    chrome.storage.local.set({ 'images': arrayImages });
  });
});;