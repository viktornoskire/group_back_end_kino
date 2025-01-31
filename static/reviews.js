
document.addEventListener('DOMContentLoaded', function () {
    async function fetchReviews (page) {
      const url = (`/api/reviews/${movieId}?page=${page}`);
      const res = await fetch(url)
      const data = await res.json();
   
  const revUl = document.querySelector('.review-ul');
  
  revUl.innerHTML = "";

  data.reviews.forEach(review => {
      const author = review.author;
      const rating = review.rating;
      const comment = review.comment;

      const revCom = document.createElement('li');
      revCom.classList.add('review-li')
      revCom.innerHTML = `
      <p><strong>${author}</strong><p>
      <p>Betyg - ${rating}</p>
      <p>${comment}</p>`;

      revUl.appendChild(revCom);
  });

  // prevButton.disable = data.pagignation.page === 1;
  // nextButton.disable = data.pagignation.page >= data.pagignation.pageCount;
  return data;
}

const data = fetchReviews(); 
console.log(data); 

let currentPage = 1;
const prevButton = document.querySelector('.review-prev');
prevButton.addEventListener("click", () =>{
if (currentPage > 1) {
  currentPage--;
  fetchReviews(currentPage)
}
});

const nextButton = document.querySelector('.review-next');
nextButton.addEventListener('click', () =>{
  if((currentPage * 5) < 15){
    currentPage++;
  fetchReviews(currentPage);
  }
  
});

fetchReviews(currentPage);
});


 
