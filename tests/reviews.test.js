import { describe, test, expect } from '@jest/globals';
import { getReviews } from '../static/loadReviews.js';

describe('Paginated review', () => {

  test('Should display page 1', async () => {

    const mockReviews = {
      fetchReviews: async () => {
        return {
          reviews: [mockReview()],
          pagination: {
            meta: {
              page: 1,
            }
          }
        };
      }
    };

    const rev = await getReviews(mockReviews);

    expect(rev.pagination.meta.page).toBe(1);

  });
});

function mockReview(overrids) {
  return {
    pagination: {
      meta: {
        page: 1,
        pageSize: 5,
        pageCount: 5,
        total: 24,
        ...overrids
      }
    },
  };
}
