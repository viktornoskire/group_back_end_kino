const frontpageScreeningsList = document.querySelector(".screenings-list");

async function fetchFrontpageScreeningsData() {
  const response = await fetch("/api/screenings");
  const screenings = await response.json();

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

fetchFrontpageScreeningsData();