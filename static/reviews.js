const parts = window.location.pathname.split('/');
const movieId = parts.length > 2 ? parts[2] : null;

async function reviews(page) {

  page = page || 1;

  try {
    const response = await fetch(`/api/reviews/${movieId}/${page}`);
    const data = await response.json();

    console.log("min data", data);

    const revUl = document.querySelector('.review-ul');
    revUl.innerHTML = "";

    data.reviews.forEach(review => {
      const revLi = document.createElement('li');
      revLi.classList.add('review-li');
      revUl.append(revLi);

      const revAut = document.createElement('p')
      revAut.textContent = review.author;
      revLi.append(revAut);

      const revRat = document.createElement('p')
      revRat.textContent = review.rating;
      revLi.append(revRat);

      const revCom = document.createElement('p')
      revCom.textContent = review.comment;
      revLi.append(revCom);

    });

    let currentPage = data.pagination.page;

    const prevButton = document.querySelector('.review-prev');
    if (currentPage == 1) {
      prevButton.disabled = true;
    }

    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        reviews(currentPage);
        nextButton.disabled = false;
      } else {
        prevButton.disabled = true;
      }
    });

    const nextButton = document.querySelector('.review-next');

    if (currentPage == data.pagination.pageCount) {
      nextButton.disabled = true;
    }

    nextButton.addEventListener('click', () => {
      if ((currentPage * 5) < data.pagination.total) {
        currentPage++;
        reviews(currentPage);
        prevButton.disabled = false;
      } else {
        nextButton.disabled = true;
      }
    });

  } catch (error) {
    console.log('Couldnt get reviwes', error);
  }
}

reviews();

