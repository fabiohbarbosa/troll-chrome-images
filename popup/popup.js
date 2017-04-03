// When the popup HTML has loaded
window.addEventListener('load', function (evt) {

  chrome.storage.local.get('images', function (result) {
    if (!result.images) return;
    document.getElementById('images').innerHTML = result.images;
  });

  // save
  document.getElementById('save').onclick = function () {
    var images = document.getElementById('images').value;

    var arrayImages = [];
    if (images.indexOf(',') > 0) {
      var allImages = images.split(',');
      for (var i = 0; i < allImages.length; i++) {
        if (!allImages[i]) continue;
        arrayImages.push(allImages[i]);
      }
    } else {
      arrayImages.push(images);
    }
    chrome.storage.local.set({ 'images': arrayImages });
    showMessage('Saved!', 'ok');
    window.close();
  };

  // clear
  document.getElementById('clear').onclick = function () {
    document.getElementById('images').value = null;
    chrome.storage.local.set({ 'images': null });
    showMessage('Cleared!', 'remove');
    window.close();
  }

  document.getElementById('close-button').onclick = function() {
    window.close();
  }

  function showMessage(msg, icon) {
    document.getElementById('message').innerHTML = '<i class="glyphicon glyphicon-'+icon+'"></i> ' + msg;
    document.getElementById('message').style.display = 'inline';
  }

});
