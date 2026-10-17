# Minimalist Pomodoro Timer

A clean, distraction-free 25-minute Pomodoro timer built with vanilla HTML, CSS, and JavaScript.

## How to Run It

1. Open `index.html` directly in any web browser (Chrome, Edge, Firefox, Brave).
   - In File Explorer, just double-click `index.html`.
   - Or right-click `index.html` in VS Code and choose **Open with Live Server** (if you have the extension installed).

## Features

- **25-Minute Countdown**: Standard focus block for deep work.
- **Controls**:
  - **Start**: Begins or resumes countdown.
  - **Pause**: Temporarily pauses the clock.
  - **Reset**: Stops and restores the clock back to 25:00.
- **Dynamic Tab Title**: Keeps track of time left right in your browser tab title.
- **Completion Chime**: Plays a subtle audio chime using Web Audio API when time expires (no external audio files required).

## Key JavaScript Concepts Used

1. **DOM Selection**: Using `document.getElementById()` to reference HTML elements.
2. **Interval Management**: Using `setInterval()` for second-by-second countdown and `clearInterval()` to stop/pause.
3. **State Tracking**: Using variables (`timeLeft`, `timerId`) to know if the timer is ticking and how many seconds remain.
4. **String Formatting**: Using `Math.floor()`, the remainder operator (`%`), and `String.prototype.padStart()` to format `25:00`.
5. **Event Listeners**: Using `.addEventListener('click', ...)` to respond to button clicks.

