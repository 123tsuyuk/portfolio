function openArtwork(artworkId) {
    alert("Open artwork details for " + artworkId);
}

let currentIndex = 0; // Index of the currently displayed image
let artworks = []; // Array to store all artwork data

document.querySelectorAll('.artwork').forEach((item, index) => {
    const imgElement = item.querySelector('img');
    artworks.push({
        id: item.getAttribute('data-artwork'),
        title: item.getAttribute('data-title'),
        details: item.getAttribute('data-details'),
        backgroundUrl: item.style.backgroundImage.slice(5, -2), // Extract background URL
        thumbnailUrl: imgElement.getAttribute('src'),
        fullsizeUrl: item.getAttribute('data-fullsize-url')
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
    modalImg.src = artwork.fullsizeUrl;
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

function preloadBackgroundImages() {
    let index = 0;
    const loadBackgroundImage = () => {
        if (index < artworks.length) {
            const artwork = artworks[index];
            const img = new Image();
            img.onload = () => {
                console.log(`Background ${artwork.title} loaded`);
                const artworkDiv = document.querySelector(`.artwork[data-artwork="${artwork.id}"]`);
                artworkDiv.style.backgroundImage = `url(${artwork.backgroundUrl})`;
                index++;
                loadBackgroundImage(); // Load the next background image after the current one is loaded
            };
            img.src = artwork.backgroundUrl;
        } else {
            // Start lazy loading thumbnails after all background images are loaded
            lazyLoadThumbnails();
        }
    };
    loadBackgroundImage();
}

function lazyLoadThumbnails() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src'); // Set the actual src attribute
                img.onload = () => {
                    img.removeAttribute('data-src'); // Remove data-src after loading
                    img.parentElement.classList.add('loaded');
                    img.parentElement.style.backgroundImage = 'none'; // Remove background image
                };
                observer.unobserve(img); // Stop observing after loading
            }
        });
    });

    document.querySelectorAll('.artwork img').forEach(img => {
        observer.observe(img); // Start observing each thumbnail
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.artwork img').forEach(img => {
        img.setAttribute('data-src', img.src);
        img.src = ''; // Remove src to trigger lazy loading later
    });
    preloadBackgroundImages();
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
