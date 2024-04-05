function openArtwork(artworkId) {
    // Function to open a modal or new page displaying the artwork's full size and details
    // This is a placeholder for functionality you'll need to implement based on your design
    alert("Open artwork details for " + artworkId);
}

// Function to show the modal with details
function showArtworkDetails(artworkId) {
    var modal = document.getElementById("artworkModal");
    var modalImg = document.getElementById("modalImage");
    var captionText = document.getElementById("caption");
    var img = document.querySelector(`[data-artwork='${artworkId}']`);
    var title = img.getAttribute('data-title');
    var details = img.getAttribute('data-details');
    var fullSizeUrl = img.getAttribute('data-fullsize-url');

    modal.style.display = "block";
    modalImg.src = fullSizeUrl; // Use the full-size image URL
    captionText.innerHTML = `<strong>${title}</strong><br>${details}`;

    // Function to close the modal
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
}


// Function to close the modal if user clicks anywhere outside of the modal image
window.onclick = function(event) {
    var modal = document.getElementById("artworkModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
