function openArtwork(artworkId) {
    // Function to open a modal or new page displaying the artwork's full size and details
    // This is a placeholder for functionality you'll need to implement based on your design
    alert("Open artwork details for " + artworkId);
}
let currentIndex = 0; // Index of the currently displayed image
let artworks = []; // Array to store all artwork data

document.querySelectorAll('.artwork').forEach((item, index) => {
    artworks.push({
        id: item.getAttribute('data-artwork'),
        title: item.getAttribute('data-title'),
        details: item.getAttribute('data-details'),
        url: item.getAttribute('data-fullsize-url')
    });
    item.onclick = () => showArtworkDetails(index); // Use index instead of ID
});

function showArtworkDetails(index) {
    currentIndex = index; // Update current index
    const artwork = artworks[index];
    var modal = document.getElementById("artworkModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = artwork.url;
    captionText.innerHTML = `<strong>${artwork.title}</strong><br>${artwork.details}`;
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
    artworks.forEach(artwork => {
        const img = new Image();
        img.onload = () => console.log(`${artwork.title} loaded`);
        img.src = artwork.url;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
});