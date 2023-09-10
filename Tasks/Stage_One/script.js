const currentDate = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const currentDay = document.querySelector('[data-testid="currentDayOfTheWeek"]');
currentDay.textContent = daysOfWeek[currentDate.getUTCDay()];

const currentUTCTime = document.querySelector('[data-testid="currentUTCTime"]');
currentUTCTime.textContent = Date.now();