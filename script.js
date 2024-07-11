document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0; // Index of the currently displayed image
    let artworks = []; // Array to store all artwork data

    document.querySelectorAll('.artwork').forEach((item, index) => {
        const imgElement = item.querySelector('img');
        artworks.push({
            id: item.getAttribute('data-artwork'),
            title: item.getAttribute('data-title'),
            details: item.getAttribute('data-details'),
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

        // Set the background image of the modal to the thumbnail initially
        modalImg.style.backgroundImage = `url(${artwork.thumbnailUrl})`;
        modalImg.style.backgroundSize = 'cover';
        modalImg.style.backgroundPosition = 'center';
        modalImg.classList.add('loading'); // Add loading class

        modal.style.display = "block";
        captionText.innerHTML = `<strong>${artwork.title}</strong><br>${artwork.details}`;

        // Load the full-size image
        const fullsizeImg = new Image();
        fullsizeImg.onload = () => {
            modalImg.src = artwork.fullsizeUrl;
            modalImg.style.backgroundImage = 'none'; // Remove the background image
            modalImg.classList.remove('loading'); // Remove loading class
        };
        fullsizeImg.src = artwork.fullsizeUrl;
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
        document.getElementById("modalImage").classList.remove('loading'); // Remove loading class when the modal is closed
        document.getElementById("modalImage").src = ''; // Clear the src to avoid displaying the old image
    };

    // Function to close the modal if user clicks anywhere outside of the modal image
    window.onclick = function(event) {
        var modal = document.getElementById("artworkModal");
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("modalImage").classList.remove('loading'); // Remove loading class when the modal is closed
            document.getElementById("modalImage").src = ''; // Clear the src to avoid displaying the old image
        }
    };

    function preloadImages() {
        let index = 0;
        const loadImages = () => {
            if (index < artworks.length) {
                const artwork = artworks[index];
                const img = new Image();
                img.onload = () => {
                    console.log(`${artwork.title} loaded`);
                    document.querySelector(`.artwork[data-artwork="${artwork.id}"]`).classList.add("loaded");
                    index++;
                    loadImages(); // Load the next image after the current one is loaded
                };
                img.src = artwork.thumbnailUrl;
            }
        };
        loadImages();
    }

    preloadImages();

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

    // Add event listeners for navigation arrows
    document.querySelector(".prev").addEventListener("click", () => changeImage(-1));
    document.querySelector(".next").addEventListener("click", () => changeImage(1));
});
