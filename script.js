function openArtwork(artworkId) {
    alert("Open artwork details for " + artworkId);
}

let currentIndex = 0; // Index of the currently displayed image
let artworks = []; // Array to store all artwork data

document.querySelectorAll('.artwork').forEach((item, index) => {
    artworks.push({
        id: item.getAttribute('data-artwork'),
        title: item.getAttribute('data-title'),
        details: item.getAttribute('data-details'),
        url: item.getAttribute('data-fullsize-url'),
        thumbnail: item.style.backgroundImage // Get the thumbnail image URL
    });
    item.onclick = () => showArtworkDetails(index); // Use index instead of ID
});

function showArtworkDetails(index) {
    currentIndex = index; // Update current index
    const artwork = artworks[index];
    var modal = document.getElementById("artworkModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");

    // Set the background image of the modal to the thumbnail
    modalImg.style.backgroundImage = artwork.thumbnail;
    modalImg.style.backgroundSize = 'cover'; // Ensure the background covers the modal
    modal.style.display="block"
    modalImg.style.display = "block";
    captionText.innerHTML = `<strong>${artwork.title}</strong><br>${artwork.details}`;

    // Hide the high-res image initially
    // modalImg.style.display = "none";

    // Load the high-resolution image
    var tempImg = new Image();
    tempImg.onload = function() {
        modalImg.src = artwork.url;
        // modalImg.style.display = "block"; // Show the high-res image once it's loaded
        modalImg.style.backgroundImage = 'none'; // Remove the thumbnail background once high-res image is loaded
    };
    tempImg.src = artwork.url;
}

function changeImage(step) {
    // Calculate new index
    let newIndex = currentIndex + step;
    if (newIndex < 0) newIndex = artworks.length - 1;
    if (newIndex >= artworks.length) newIndex = 0;
    showArtworkDetails(newIndex); // Show the new image
}

// Function to close the modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    var modal = document.getElementById("artworkModal");
    modal.style.display = "none";
};

// Function to close the modal if user clicks anywhere outside of the modal image
window.onclick = function(event) {
    var modal = document.getElementById("artworkModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function preloadImages() {
    let index = 0;
    const loadImage = () => {
        if (index < artworks.length) {
            const artwork = artworks[index];
            const img = new Image();
            img.onload = () => {
                console.log(`${artwork.title} loaded`);
                document.querySelector(`.artwork[data-artwork="${artwork.id}"]`).classList.add("loaded");
                index++;
                loadImage(); // Load the next image after the current one is loaded
            };
            img.src = artwork.url;
        }
    };
    loadImage();
}

document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
});

const blurDivs = document.querySelectorAll(".artwork");
blurDivs.forEach(div => {
    const img = div.querySelector("img");
    function loaded() {
        // show img
        div.classList.add("loaded");
        // remove background image
        div.style.backgroundImage = 'none';
    }

    if (img.complete) {
        loaded();
    } else {
        img.addEventListener("load", loaded);
    }
});
