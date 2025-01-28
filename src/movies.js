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
