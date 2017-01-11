function executeScript(tabId, callback) {
  if (!tabId) return;
  chrome.tabs.executeScript(tabId, { file: "js/jquery.js" }, function() {
    chrome.tabs.executeScript(tabId, { file: 'js/content.js' }, function() {
      callback();
    });
  });
}

function changeImages(tabId) {

  executeScript(tabId, function() {
    // Recebe mensagem do content.js executado nas abas
    chrome.runtime.onMessage.addListener(function(message)  {
      console.log(message.title)
    });

    chrome.storage.local.get('images', function(result) {
      if (!result || !result.images || result.images.length == 0) return;

      var message = {
        images: result.images
      };

      // Envia imagens para o content.js
      chrome.tabs.sendMessage(tabId, message, function(request) {
        console.log('Total de imagens substituidas: ' + request.totalImg);
      });

    });
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  var tabId = activeInfo.tabId;
  changeImages(tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId) {
  changeImages(tabId);
});
