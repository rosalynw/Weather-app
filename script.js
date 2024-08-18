// Get the modal element
const modal = document.getElementById("searchModal");

// Get the button that opens the modal
const btn = document.querySelector(".submit");

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "flex"; // Use flex to center the modal
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// Optional: Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
