import getReviews from '../static/reviews.js';
import { describe, test, expect } from '@jest/globals';

describe('Paginated review', () => {

  test('Should display page 1', async () => {
    const cmsAdapter = {
      fetchReviews: async () => [
        {
          pagination: {
            page: 1,
            pageSize: 5,
            pageCount: 5,
            total: 24
          }
        }
      ]
    }

    const reviews = await getReviews(cmsAdapter);
    expect(reviews.currentPage).toBe(1);
  });

});
