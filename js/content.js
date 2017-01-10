// Send a message containing the page details back to the event page

function changeImages(images) {
  var src = [];
  var index = 0;

  var allImg = document.getElementsByTagName("img"), i = 0 , img;

  while (img = allImg[i++]) {
    var style = img.style;

    var height = style.height;
    var width = style.width;

    img.src = randomImage(images);

    img.style.maxHeight = '100%';
    img.style.maxWidth = '100%';

    index++;
  }
  return index;
}

function randomImage(images) {
  return images[Math.floor((Math.random() * images.length))];
}

chrome.runtime.sendMessage({
  'title': document.title,
  'url': window.location.href,
  'summary': window.getSelection().toString()
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var index = changeImages(request.images);
  sendResponse({totalImg: index});
});
