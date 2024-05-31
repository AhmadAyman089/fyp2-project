// Time in milliseconds to wait before redirecting to the game page
const redirectDelay = 5000; // 5 seconds

// Function to redirect to the game page
function redirectToGame() {
  window.location.href = 'homepage.html'; // Replace 'game.html' with your actual game page URL
}

// Wait for the specified delay before redirecting
document.getElementById("myButton").addEventListener("click", function() {
    window.location.href = 'homepage.html';
});