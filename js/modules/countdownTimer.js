// countdownTimer.js
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const countdown = (seconds) => {
  let countdownElement = document.getElementById("countdown");
  let timer = setInterval(() => {
    countdownElement.textContent = formatTime(seconds);
    if (seconds <= 0) {
      clearInterval(timer);
      countdownElement.textContent = "Время истекло!";
    }
    seconds--;
  }, 1000);
};

export default countdown;
