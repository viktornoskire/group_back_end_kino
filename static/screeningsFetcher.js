document.addEventListener("DOMContentLoaded", function () {
  fetchFrontpageScreeningsData();
});

async function fetchFrontpageScreeningsData() {
  const response = await fetch("/api/screenings");
  const screenings = await response.json();

  const frontpageScreeningsList = document.querySelector(".screenings-list");

  // Kontrollera om elementet finns
  if (!frontpageScreeningsList) {
    console.error('Elementet .screenings-list hittades inte!');
    return;
  }

  if (screenings.length === 0) {
    frontpageScreeningsList.innerHTML = "<li>Inga visningar tillgängliga just nu.</li>";
    return;
  }

  screenings.forEach(screening => {
    const listItem = document.createElement("li");
    listItem.textContent = `${screening.movie} - ${new Date(screening.start_time).toLocaleString()} - ${screening.room}`;
    frontpageScreeningsList.appendChild(listItem);
  });
}