const revArticel = document.querySelector('.review-article');
const loadButton = document.querySelector('.rev-button');

const page = 1;
const pageSize = 5;

export async function loadReview() {
  const skip = (page - 1) * pageSize;
  const revURL = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews?pagination[pageSize]=5';

  const response = await fetch(revURL);
  const dataReview = await response.json();

  console.log(dataReview);
  console.log(dataReview.data[0].attributes.comment);

  revArticel.textContent = dataReview.data[0].attributes.comment;
}


//https://plankton-app-xhkom.ondigitalocean.app/api/reviews?pagination[pageSize]=5;
//?filters[movie]=2
//?filters[movie]=1?;

/* filters[movie]=X för att hämta recensioner för film med id X
pagination[page]=X för sida X
pagination[pageSize]=X för X recensioner per sida */