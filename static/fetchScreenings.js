(async () => {
  const parts = window.location.pathname.split('/');
  const movieId = parts.length > 2 ? parts[2] : null;
  const API_URL = `http://localhost:5080/api/screenings/${movieId}`

  if (!movieId) {
    return;
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Error HTTP Status Code: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    
  } catch (e) {
    console.error(e);
  }

})()