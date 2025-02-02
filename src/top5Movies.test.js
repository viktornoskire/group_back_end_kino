import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { isValidReview } from './top5Movies.js';

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
