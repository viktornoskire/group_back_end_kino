import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { getMovieRating } from './rating.js';

describe('getMovieRating', () => {
  it('returnerar genomsnittligt betyg för minst 5 recensioner', async () => {
    const mockAdapter = {
      loadReviews: async () => [
        { attributes: { rating: 4 } },
        { attributes: { rating: 5 } },
        { attributes: { rating: 3 } },
        { attributes: { rating: 4 } },
        { attributes: { rating: 5 } }
      ],
      loadMovie: async () => ({ movieId: '9' }),
      getImdbRating: async () => 7.8
    };

    const rating = await getMovieRating(mockAdapter, '9');
    expect(rating).toBe(4.2);
  });
  it('returnerar rating från imdb om det finns färre än fem recensioner', async () => {
    const mockAdapter = {
      loadReviews: async () => [
        { attributes: { rating: 4 } },
        { attributes: { rating: 5 } },
        { attributes: { rating: 3 } },
      ],
      loadMovie: async () => ({ movieId: '9' }),
      getImdbRating: async () => 7.8
    };

    const rating = await getMovieRating(mockAdapter, '9');
    expect(rating).toBe(7.8);
  })
});