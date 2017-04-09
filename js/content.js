var imagesChanged = false;

// Send a message containing the page details back to the event page
function changeImages(images) {
  var src = [];
  var index = 0;

  var allImg = document.getElementsByTagName("img");
  var i = 0;
  var img;

  while (img = allImg[i++]) {
    if (contains(images, img.src)) continue;

    var style = img.style;

    var height = style.height;
    var width = style.width;

    var newImage = randomImage(images);
    if (!newImage) continue;

    img.src = newImage;

    img.style.maxHeight = '100%';
    img.style.maxWidth = '100%';

    index++;
  }
  return index;
}

function contains(arr, img) {
  var proxy = new Set(arr);
  if (proxy.has(img))
    return true;
  
  else 
    return false;
}

function randomImage(images) {
  return images[Math.floor((Math.random() * images.length))];
}

// send message do background
chrome.runtime.sendMessage({
  'title': document.title,
  'url': window.location.href,
  'summary': window.getSelection().toString()
});

// receive message from background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (imagesChanged) {
    return;
  }
  imagesChanged = true;
  // change images
  if (request.images) {
    var index = changeImages(request.images);
    sendResponse({ imgArraySize: index });
  }
  // get new images
  setInterval(function() {
    changeImages(request.images);
  }, 2000);
});