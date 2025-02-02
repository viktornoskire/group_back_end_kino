import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { calculateAverageRating, isValidReview, sortMovies } from './top5Movies.js';

////////////////////////////////
//Test for the isValidReview-function in top5Movies.js
///////////////////////////////

describe('isValidReview()', () => {
  beforeEach(() => {
    jest.useFakeTimers(); //Let us mock the time for each test.
  });

  afterEach(() => {
    jest.clearAllTimers(); //Clear mocked time after each test.
  });

  ///////
  //Test 1 for isValidReview function
  //////

  it('Returns true if a review is withing 30 days and with rating.', () => {
    jest.setSystemTime(new Date(2025, 1, 2));

    //Creates a date 30 days ago from "today (which is 2025-02-02)
    const thirtyDaysAgo = new Date(2025, 1, 2);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const review = {
      attributes: {
        rating: 4,
        createdAt: '2025-01-20T13:37:00.000Z',
      },
    };

    expect(isValidReview(review, thirtyDaysAgo)).toBe(true);
  });

  ///////
  //Test 2 for isValidReview function
  //////

  it('Returns false if the review is older then 30 days.', () => {
    jest.setSystemTime(new Date(2025, 1, 2));

    const thirtyDaysAgo = new Date(2025, 1, 2);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const review = {
      attributes: {
        rating: 4,
        createdAt: '2024-12-20T13:37:00.000Z', //Added a date thats more than 30 days old.
      },
    };
    expect(isValidReview(review, thirtyDaysAgo)).toBe(false);
  });

  ///////
  //Test 3 for isValidReview function
  //////

  it('Returns false for review without rating', () => {
    jest.setSystemTime(new Date(2025, 1, 2));

    const thirtyDaysAgo = new Date(2025, 1, 2);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const review = {
      attributes: {
        rating: null, //Using null here, since that not a valid rating for this function.
        createdAt: '2025-01-20T13:37:00.000Z',
      },
    };
    expect(isValidReview(review, thirtyDaysAgo)).toBe(false);
  });
});

////////////////////////////////
//Test for the calculateAverageRating function in top5Movies.js
///////////////////////////////

describe('calculateAverageRating()', () => {
  ///////
  //Test 1 for calculateAverageRating function
  //////
  it('Returns null if reviews array is empty', () => {
    const reviews = [];
    expect(calculateAverageRating(reviews)).toBe(null);
  });
  ///////
  //Test 2 for calculateAverageRating function
  //////
  it('Returns correct rating when only one review exists', () => {
    const reviews = [
      {
        attributes: {
          rating: 4,
        },
      },
    ];
    expect(calculateAverageRating(reviews)).toBe(4);
  });
  ///////
  //Test 3 for calculateAverageRating function
  //////
  it('Calculates correct average for multiple reviews', () => {
    const reviews = [
      {
        attributes: {
          rating: 4,
        },
      },
      {
        attributes: {
          rating: 2,
        },
      },
      {
        attributes: {
          rating: 3,
        },
      },
    ];
    expect(calculateAverageRating(reviews)).toBe(3);
  });
});

////////////////////////////////
//Test for the sortMovies function in top5Movies.js
///////////////////////////////

describe('SortMovies()', () => {
  ///////
  //Test 1 for sortMovies function
  //////
  it('sorts movies based on the average rating, where highest rating gets sorted first.', () => {
    const movie1 = {
      averageRating: 4,
      reviewCount: 2,
    };
    const movie2 = {
      averageRating: 5,
      reviewCount: 1,
    };

    expect(sortMovies(movie1, movie2)).toBeGreaterThan(0); //movie 2 should come before movie 1
    expect(sortMovies(movie2, movie1)).toBeLessThan(0); // And here movie 2 should come before movie 1
  });

  it('Sorts a movie based on review count. If a movie has the same rating but higher reviews, it gets sorted first.', () => {
    const movie1 = {
      averageRating: 4,
      reviewCount: 2,
    };
    const movie2 = {
      averageRating: 4,
      reviewCount: 5,
    };

    expect(sortMovies(movie1, movie2)).toBeGreaterThan(0);
    expect(sortMovies(movie2, movie1)).toBeLessThan(0);
  });
});
