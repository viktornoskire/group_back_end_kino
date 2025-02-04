import { describe, test, expect } from '@jest/globals';
import { reviews } from '../static/reviews';

describe('Paginated review', () => {

  test('Should display page 1', async () => {
    const cmsReviews = {
      fetchReviews: async () => [
        mockReview({
          page: 1,
        }),
      ]
    }

    //Test here

  });

});

function mockReview(overrids) {
  return {
    pagination: {
      page: 1,
      pageSize: 5,
      pageCount: 5,
      total: 24,
      ...overrids
    },
  }
}
