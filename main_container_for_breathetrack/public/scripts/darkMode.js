/**
 * BreatheTrack Dark Mode JavaScript
 * Handles toggling and initializing dark mode across the application
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply dark mode if enabled
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  }
  
  // Find dark mode toggle if it exists on the page
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    // Set initial state of the toggle
    darkModeToggle.checked = isDarkMode;
    
    // Add event listener for toggle changes
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }
});
