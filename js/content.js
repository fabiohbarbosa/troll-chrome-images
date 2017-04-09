chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  changeImages();
});

function changeImages() {
  chrome.storage.local.get('images', (result) => {
    if (!result || !result.images) return;
    let images = result.images;
    let allImg = document.getElementsByTagName("img"), i = 0, img;

    while (img = allImg[i++]) {
      let style = img.style;

      let height = style.height;
      let width = style.width;

      let newImage = randomImage(images);
      if (!newImage) return;

      img.src = newImage;

      img.style.maxHeight = '100%';
      img.style.maxWidth = '100%';
    }
  });
}

function randomImage(images) {
  return images[Math.floor((Math.random() * images.length))];
}
