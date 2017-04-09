var tabTrolled = false;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request) return;

  tabTrolled = true;
  changeImages();
  setInterval(() => {
    changeImages();
  }, 3000);
});

function changeImages() {
  chrome.storage.local.get('images', (result) => {
    if (!result || !result.images) return;

    let images = result.images;
    let imgTags = document.getElementsByTagName("img");

    for (let i = 0; i < imgTags.length; i++) {
      let img = imgTags[i];
      if (contains(images, img.src)) continue;

      let newImage = randomImage(images);
      if (!newImage) return;

      let style = img.style;
      let height = style.height;
      let width = style.width;

      img.src = newImage;
      img.style.maxHeight = '100%';
      img.style.maxWidth = '100%';
    }
  });
}

function randomImage(images) {
  return images[Math.floor((Math.random() * images.length))];
}

function contains(arr, img) {
  var proxy = new Set(arr);
  if (proxy.has(img)) return true;
  else return false;
}

