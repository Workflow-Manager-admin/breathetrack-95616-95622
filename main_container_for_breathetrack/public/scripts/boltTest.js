/**
 * BreatheTrack BOLT Test JavaScript
 * Handles timing, scoring, and history tracking for the BOLT (Body Oxygen Level Test)
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize variables
  let timerInterval = null;
  let seconds = 0;
  let isRunning = false;
  let boltScoreHistory = [];
  
  // Load history from localStorage
  loadHistory();
  
  // Get DOM elements
  const timerValueElement = document.getElementById('timer-value');
  const startButton = document.getElementById('start-timer');
  const stopButton = document.getElementById('stop-timer');
  const resetButton = document.getElementById('reset-timer');
  const boltScoreContainer = document.getElementById('bolt-score-container');
  const boltScoreElement = document.getElementById('bolt-score');
  const boltInterpretationElement = document.getElementById('bolt-interpretation');
  const clearHistoryButton = document.getElementById('clear-history');
  
  // Only proceed if we have the required elements
  if (!startButton || !stopButton || !resetButton || !timerValueElement) return;
  
  // Event listeners for buttons
  startButton.addEventListener('click', startTimer);
  stopButton.addEventListener('click', stopTimer);
  resetButton.addEventListener('click', resetTimer);
  
  if (clearHistoryButton) {
    clearHistoryButton.addEventListener('click', clearHistory);
  }

  // Event listener for page visibility change
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Initialize history display if elements exist
  renderHistory();

  /**
   * Start the BOLT test timer
   */
  function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    seconds = 0;
    
    // Hide previous results
    if (boltScoreContainer) {
      boltScoreContainer.style.display = 'none';
    }
    
    // Update UI
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
    timerValueElement.textContent = '0';
    
    // Start timer interval
    timerInterval = setInterval(() => {
      seconds++;
      timerValueElement.textContent = seconds;
    }, 1000);
  }
  
  /**
   * Stop the BOLT test timer and calculate score
   */
  function stopTimer() {
    if (!isRunning) return;
    
    // Clear interval and update state
    clearInterval(timerInterval);
    isRunning = false;
    
    // Update UI
    stopButton.disabled = true;
    resetButton.disabled = false;
    
    // Calculate and display BOLT score
    if (boltScoreContainer && boltScoreElement && boltInterpretationElement) {
      boltScoreContainer.style.display = 'block';
      boltScoreElement.textContent = seconds;
      
      // Set interpretation text based on BOLT score
      const interpretation = getBoltInterpretation(seconds);
      boltInterpretationElement.textContent = interpretation;
      
      // Save result to history
      saveResult(seconds, interpretation);
      renderHistory();
    }
  }
  
  /**
   * Reset the timer for a new test
   */
  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    seconds = 0;
    
    // Update UI
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    timerValueElement.textContent = '0';
  }
  
  /**
   * Handle page visibility change to prevent timer from running in background
   */
  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden' && isRunning) {
      // If page is hidden and timer is running, pause it
      clearInterval(timerInterval);
    } else if (document.visibilityState === 'visible' && isRunning) {
      // If page becomes visible again and timer was running, resume it
      timerInterval = setInterval(() => {
        seconds++;
        timerValueElement.textContent = seconds;
      }, 1000);
    }
  }
  
  /**
   * Get the interpretation text based on BOLT score
   */
  function getBoltInterpretation(score) {
    if (score < 10) {
      return "Poor breathing efficiency. Regular practice recommended.";
    } else if (score < 20) {
      return "Fair breathing efficiency. Room for improvement.";
    } else if (score < 30) {
      return "Good breathing efficiency.";
    } else if (score < 40) {
      return "Very good breathing efficiency.";
    } else {
      return "Excellent breathing efficiency!";
    }
  }
  
  /**
   * Save BOLT test result to history
   */
  function saveResult(score, interpretation) {
    const now = new Date();
    const result = {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: score,
      interpretation: interpretation
    };
    
    boltScoreHistory.push(result);
    
    // Save to localStorage
    try {
      localStorage.setItem('boltScoreHistory', JSON.stringify(boltScoreHistory));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }
  
  /**
   * Load BOLT score history from localStorage
   */
  function loadHistory() {
    try {
      const saved = localStorage.getItem('boltScoreHistory');
      if (saved) {
        boltScoreHistory = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
      boltScoreHistory = [];
    }
  }
  
  /**
   * Clear BOLT score history
   */
  function clearHistory() {
    if (confirm('Are you sure you want to clear all your BOLT test history?')) {
      boltScoreHistory = [];
      localStorage.removeItem('boltScoreHistory');
      renderHistory();
    }
  }
  
  /**
   * Render the history data in the UI
   */
  function renderHistory() {
    const historyData = document.getElementById('history-data');
    const chartPlaceholder = document.getElementById('chart-placeholder');
    const chartContainer = document.getElementById('history-chart-container');
    
    if (!historyData) return;
    
    // Clear previous entries
    historyData.innerHTML = '';
    
    if (boltScoreHistory.length === 0) {
      // Show placeholder if no history
      if (chartPlaceholder) chartPlaceholder.style.display = 'flex';
      if (chartContainer) chartContainer.style.display = 'none';
      return;
    }
    
    // Hide placeholder, show chart
    if (chartPlaceholder) chartPlaceholder.style.display = 'none';
    if (chartContainer) chartContainer.style.display = 'block';
    
    // Add history entries to the table
    boltScoreHistory.reverse().forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.time}</td>
        <td>${entry.score}</td>
        <td>${getShortInterpretation(entry.score)}</td>
      `;
      historyData.appendChild(row);
    });
    
    // In a real implementation, render chart with chart.js or similar library
  }
  
  /**
   * Get a short classification based on BOLT score
   */
  function getShortInterpretation(score) {
    if (score < 10) {
      return "Poor";
    } else if (score < 20) {
      return "Fair";
    } else if (score < 30) {
      return "Good";
    } else if (score < 40) {
      return "Very Good";
    } else {
      return "Excellent";
    }
  }
});
