// __Events for the info modal___________________________________________________________
if (document.querySelector('.movie-headline') || document.querySelector('.about-page')) {
  const item0 = document.querySelector('.modal-item-0');
  const item1 = document.querySelector('.modal-item-1');
  const item2 = document.querySelector('.modal-item-2');

  function addListener(li) {
    const btn = li.querySelector('.modal-open');
    const answer = li.querySelector('.modal-answer');

    btn.addEventListener('click', () => {
      btn.classList.toggle('clicked');
      if (btn.className === 'modal-open clicked') {
        btn.src = './img/QnAClose.png';
        btn.alt = 'Close button';
        answer.style.display = '';
      } else {
        btn.src = './img/QnAOpen.png';
        btn.alt = 'Open button';
        answer.style.display = 'none';
      }
    });
  }

  addListener(item0);
  addListener(item1);
  addListener(item2);
}

// __Events for the header____________________________________
const r = document.querySelector('.hamburger-btn'),
  n = document.querySelector('.close-btn'),
  l = document.querySelector('.menu-overlay'),
  t = document.querySelector('.overlay-blur');
r.addEventListener('click', () => {
  l.style.display = "block", t.classList.add('active');
});
n.addEventListener('click', () => {
  l.style.display = "none", t.classList.remove('active');
});
t.addEventListener('click', () => {
  (l.style.display = "none"), t.classList.remove('active');
});

// __ Access review input __ 

if (document.querySelector('.movie-title')) {
  const reviewForm = document.querySelector('.review-box');

  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const comment = document.querySelector('.review-input');
    const rating = document.querySelector('.rating-input');
    const name = document.querySelector('.name-input');

    const movie = window.location.pathname.slice(-1);
    if (comment.value == '' || name.value == '') {
      console.log('Movie ID: ', movie);
      console.log('Comment: ', comment.value ? comment.value : "No comment inserted");
      console.log('Rating: ', rating.value);
      console.log('Name: ', name.value ? name.value : 'No name inserted');
    } else {
      console.log('Movie ID: ', movie);
      console.log('Comment: ', comment.value);
      console.log('Rating: ', rating.value);
      console.log('Name: ', name.value);
    }

    comment.value = "";
    rating.value = 0;
    name.value = "";
  });
};