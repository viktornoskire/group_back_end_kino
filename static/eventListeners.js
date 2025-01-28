// ____________________________________________________
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