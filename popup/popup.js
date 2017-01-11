// When the popup HTML has loaded
window.addEventListener('load', function(evt) {

  chrome.storage.local.get('images', function (result) {
    document.getElementById('images').innerHTML = result.images;
  });

  document.getElementById('form').addEventListener('submit', function() {
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
  });

});
