import { describe, test, expect } from '@jest/globals';
import fetchReviews from '../static/loadReviews.js';
import loadReviews from '../static/reviews.js';

const fakeReview = {
  reviews: {
    author: "Kalle",
    rating: 3,
    comment: "Hej"
  },
  pagination: {
    page: 1,
    pageCount: 5,
    pageSize: 5,
    total: 25
  }
}

test('Should display page 1', () => {
  document.addEventListener('DOMContentLoaded', function () {
    fetchReviews();
    const review = new loadReviews(fakeReview);
    review.render(document);

    expect(review.currentPage).toBe(1);
  });
});

test('Should display page 2', () => {
  document.addEventListener('DOMContentLoaded', function () {
    fetchReviews(2);
    const review = new loadReviews(fakeReview);
    review.render(document);

    expect(review.currentPage).toBe(2);
  });
});

test('Next button should be disabel', () => {
  document.addEventListener('DOMContentLoaded', function () {
    fetchReviews(6);
    const review = new loadReviews(fakeReview);
    review.render(document);

    expect(review.nextButton).toBe(disabled);
  });
});