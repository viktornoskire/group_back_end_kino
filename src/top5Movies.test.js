import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { isValidReview } from './top5Movies.js';
//Creates the test for the isValidReview function.
describe('isValidReview()', () => {
  beforeEach(() => {
    jest.useFakeTimers(); //Let us mock the time for each test.
  });

  afterEach(() => {
    jest.clearAllTimers(); //Clear mocked time after each test.
  });

  //Testing if it returns a valid review.
  it('Returns true if a review is withing 30 days and with rating.', () => {
    jest.setSystemTime(new Date(2025, 1, 2));

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
});

it('Returns false if the review is older then 30 days.');
