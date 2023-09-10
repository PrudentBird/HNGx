const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function updateCurrentTime() {
  const currentDate = new Date();
  
  const currentDay = document.querySelector('[data-testid="currentDayOfTheWeek"]');
  currentDay.textContent = daysOfWeek[currentDate.getUTCDay()];

  const currentUTCTime = document.querySelector('[data-testid="currentUTCTime"]');
  currentUTCTime.textContent = Date.now();
}

updateCurrentTime();

setInterval(updateCurrentTime, 1);
