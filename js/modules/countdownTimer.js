const countdown = (seconds, initialSeconds) => {
  const countdownElement = document.getElementById("countdown");
  const circle = document.querySelector(".progress-ring__circle");
  const endDot = document.querySelector(".progress-ring__dot"); // Новый элемент для точки
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const setProgress = (percent) => {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    const angle = ((360 * percent) / 100) * (Math.PI / 180); // Угол в радианах
    const x = 60 + radius * Math.cos(angle - Math.PI / 2); // Вычисляем x-координату точки
    const y = 60 + radius * Math.sin(angle - Math.PI / 2); // Вычисляем y-координату точки
    endDot.setAttribute("cx", x);
    endDot.setAttribute("cy", y);
  };

  const timer = setInterval(() => {
    countdownElement.textContent = formatTime(seconds);
    const progress = (seconds / initialSeconds) * 100;
    setProgress(progress);

    if (seconds <= 0) {
      clearInterval(timer);
      countdownElement.textContent = "Время истекло!";
    }
    seconds--;
  }, 1000);
};

export default countdown;
