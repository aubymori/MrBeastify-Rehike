const IMAGE_COUNT = 37;

// Apply the overlay
function applyOverlay(thumbnailElement, overlayImageUrl, flip) {
  // Create a new img element for the overlay
  const overlayImage = document.createElement("img");
  overlayImage.src = overlayImageUrl;
  overlayImage.style.position = "absolute";
  overlayImage.style.top = "0";
  overlayImage.style.left = "0";
  overlayImage.style.width = "100%";
  overlayImage.style.height = "100%";
  overlayImage.style.zIndex = "0"; // Ensure overlay is on top
  overlayImage.classList.add("mrbeast");

  if (flip) {
    overlayImage.style.transform = "scaleX(-1)"; // Flip the image horizontally
  }

  // Style the thumbnailElement to handle absolute positioning
  thumbnailElement.style.position = "relative";

  // Append the overlay to the parent of the thumbnail
  thumbnailElement.parentElement.appendChild(overlayImage);
  thumbnailElement.classList.add("processed");
}

// Looks for all thumbnails and applies overlay
function applyOverlayToThumbnails() {
  // Query all YouTube video thumbnails on the page that haven't been processed yet, and also ignores shorts thumbnails
  const elementQuery =
  `
  .yt-lockup-video .yt-lockup-thumbnail .yt-thumb img:not(.processed):not(.mrbeast):not(.mouseover-img),
  .related-list-item-compact-video .yt-uix-simple-thumb-wrap img:not(.processed):not(.mrbeast):not(.mouseover-img)
  `;
  const thumbnailElements = document.querySelectorAll(elementQuery);

  // Apply overlay to each thumbnail
  thumbnailElements.forEach((thumbnailElement) => {
    // Apply overlay and add to processed thumbnails
    let loops = Math.random() > 0.001 ? 1 : 20; // Easter egg
    for (let i = 0; i < loops; i++) {
      // Get overlay image URL from your directory
      const overlayImageUrl = getRandomImageFromDirectory();
      const flip = Math.random() < 0.25; // 25% chance to flip the image
      applyOverlay(thumbnailElement, overlayImageUrl, flip);
    }
  });
}


// Get a random image URL from a directory
function getRandomImageFromDirectory() {
  let randomIndex = Math.floor(Math.random() * IMAGE_COUNT - 1) + 1;
  if (randomIndex == 0) randomIndex = 1;
  return chrome.runtime.getURL(`images/${randomIndex}.png`);
}

setInterval(applyOverlayToThumbnails, 100);

console.log("MrBeastify Loaded Successfully");