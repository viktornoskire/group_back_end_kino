import fetch from 'node-fetch';
import MarkdownIt from 'markdown-it';

const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

const md = new MarkdownIt();

function easyObject(api) {
  return {
    id: api.id,
    ...api.attributes,
    intro: md.render(api.attributes.intro || '')
  };
}

export async function loadMovies() {
  const res = await fetch(apiBase + '/movies');
  const payload = await res.json();
  return payload.data.map(easyObject);
}

export async function loadMovie(id) {
  const res = await fetch(apiBase + '/movies/' + id);
  const payload = await res.json();

  if(!payload.data) {
    throw new Error(`Movie with ${id} not found`);
  }

  return easyObject(payload.data);
}

const cmsScreening = {
  loadScreeningsID: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const ENDPOINT = `https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&filters[movie]=${id}`;
      const today = new Date();
      const response = await fetch(ENDPOINT);
      const data = await response.json();

      if (!data) {
        throw new Error('Could not find any data');
      }

      const screeningsArray = data.data
        .filter((screening) => {
          const screeningStartTime = new Date(screening.attributes.start_time);
          return today <= screeningStartTime;
        })
        .map((screening) => ({
          id: screening.id,
          start_time: screening.attributes.start_time,
          room: screening.attributes.room,
        }));

      return screeningsArray;

    } catch (e) {
      console.error(e);
      return [];
    }
  },
};

export default cmsScreening;
