// ==========================================
// 1. SELECT DOM ELEMENTS
// ==========================================
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const statusText = document.getElementById("status-text");

// ==========================================
// 2. STATE VARIABLES
// ==========================================
const WORK_TIME = 25 * 60; // 25 minutes in seconds
let timeLeft = WORK_TIME;
let timerId = null;

// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================

// Format seconds into "MM:SS" string
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
}

// Update the timer on the page and in the browser tab
function updateDisplay() {
  const formatted = formatTime(timeLeft);
  timerDisplay.textContent = formatted;
  document.title = `${formatted} - Pomodoro`;
}

// Play a pleasant chime using Web Audio API when time is up
function playChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const chord = [523.25, 659.25, 783.99]; // C5, E5, G5 notes

    chord.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      const startTime = audioCtx.currentTime + index * 0.15;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch (err) {
    console.log("Audio playback note:", err);
  }
}

// ==========================================
// 4. TIMER CONTROLS
// ==========================================

function startTimer() {
  // If timer is already running, don't start another one
  if (timerId !== null) return;

  statusText.textContent = "Focus session in progress...";
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  // Run this function every 1000 milliseconds (1 second)
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    // When timer reaches 0
    if (timeLeft <= 0) {
      clearInterval(timerId);
      timerId = null;
      playChime();
      statusText.textContent = "Time's up! Great job staying focused.";
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  }, 1000);
}

function pauseTimer() {
  if (timerId === null) return;

  clearInterval(timerId);
  timerId = null;

  statusText.textContent = "Timer paused.";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  // Stop countdown if currently active
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }

  // Reset state to initial 25 minutes
  timeLeft = WORK_TIME;
  updateDisplay();

  // Reset UI elements
  statusText.textContent = "Click Start to begin focusing";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// ==========================================
// 5. EVENT LISTENERS
// ==========================================
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// Initial display setup
updateDisplay();

