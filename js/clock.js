function updateClock() {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds} (GMT-5)`;

  // Update both clocks if they exist
  const menuClock = document.getElementById('gmt-clock-menu');
  const headerClock = document.getElementById('gmt-clock-header');
  
  if (menuClock) menuClock.textContent = timeString;
  if (headerClock) headerClock.textContent = timeString;
}

document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 1000);
});