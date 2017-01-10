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

    var message = {
      images: [
      'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/4/005/093/3a2/2a09bd3.jpg',
      'https://scontent.xx.fbcdn.net/v/t1.0-9/12227640_939751026119495_5550899219362026178_n.jpg?oh=5d962b39957017e87eca34dff169b259&oe=58EC570B',
      'https://scontent.xx.fbcdn.net/v/t1.0-0/p206x206/14079615_1125800730789477_4512210792359351004_n.jpg?oh=4c7499bc6638d013229456120e02aa97&oe=58B8A074',
      'https://scontent.xx.fbcdn.net/v/t1.0-9/67577_392099134218023_1411454898_n.jpg?oh=27d206293e49adc9a0e2de1da9b7e3cd&oe=58EB8391'
      ]
    };

    // Envia imagens para o content.js
    chrome.tabs.sendMessage(tabId, message, function(request) {
      console.log('Total de imagens substituidas: ' + request.totalImg);
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
