document.addEventListener("DOMContentLoaded", async function () {
  const screeningsList = document.querySelector("#screenings-list");

  const response = await fetch("/api/screenings");
  if (!response.ok) {
    console.error("Misslyckades med att ladda visningar");
    screeningsList.innerHTML = "<li>Kunde inte ladda visningar.</li>";
    return;
  }

  const screenings = await response.json();
  console.log(screenings);
  
  if (screenings.length === 0) {
    screeningsList.innerHTML = "<li>Inga visningar tillgängliga just nu.</li>";
    return;
  }

  screenings.forEach(screening => {
    const listItem = document.createElement("li");
    listItem.textContent = `${screening.movie} - ${new Date(screening.start_time).toLocaleString()} - ${screening.room}`;
    screeningsList.appendChild(listItem);
  });
});
