import fetch from 'node-fetch';

const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

async function fetchScreenings() {
  const res = await fetch(`${apiBase}/screenings?populate=movie`);
  const payload = await res.json();

  return payload.data.map(screening => ({
    id: screening.id,
    movie: screening.attributes.movie.data.attributes.title,
    start_time: new Date(screening.attributes.start_time),
    room: screening.attributes.room
  }));
}

function filterScreeningsByDate(screenings) {
  const currentDate = new Date();
  const dateInFiveDays = new Date();
  dateInFiveDays.setDate(currentDate.getDate() + 5);

  return screenings.filter(screening => {
    if (screening.start_time >= currentDate && screening.start_time <= dateInFiveDays) {
      return true;
    } else {
      return false;
    }
  });
}

export async function loadScreenings() {
  const screenings = await fetchScreenings();
  const filteredScreenings = filterScreeningsByDate(screenings);

  const sortedScreenings = filteredScreenings.sort((a, b) => a.start_time - b.start_time);

  const nextTenScreenings = sortedScreenings.slice(0, 10);

  return nextTenScreenings;
}