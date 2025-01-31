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

  if (!payload.data) {
    throw new Error(`Movie with ${id} not found`);
  }

  return easyObject(payload.data);
}

const cmsScreening = {
  loadScreeningsID: async (id) => {
    const url = `https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie?filters[movie]=${id}`;
    const res = await fetch(url);
    const payload = await res.json();
    return payload.data;
  },
};

export default cmsScreening;

export async function loadReview(id, pageSize, page) {

  const api = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';
  const revURL = `${api}?filters[movie]=${id}&pagination[pageSize]=${pageSize}&pagination[page]=${page}`;

  const response = await fetch(revURL);
  const dataReview = await response.json();

  if (!dataReview) {
    throw new Error(`Review with ${id} not found`);
  }

  return dataReview;
}