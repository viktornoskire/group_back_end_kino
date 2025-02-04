import { jest, test, expect, describe, } from '@jest/globals'
import { getMovieRating } from './getMovieRating';
import * as cmsAdapter from './cmsAdapter'; // Vi antar att loadReviews & loadMovie finns här
import * as imdbService from './imdbService'; // Vi antar att getImdbRating finns här

// Mocka CMS-adaptern och IMDB-service
jest.mock('./cmsAdapter');
jest.mock('./imdbService');

describe('getMovieRating', () => {
  
  test('Beräknar medelbetyg korrekt om det finns fem eller fler recensioner', async () => {
    const mockReviews = [
      { attributes: { rating: 5 } },
      { attributes: { rating: 1 } },
      { attributes: { rating: 4 } },
      { attributes: { rating: 3 } },
      { attributes: { rating: 5 } }
    ];

    const mockMovie = { imdbId: 'tt1234567' };

    cmsAdapter.loadReviews.mockResolvedValue(mockReviews);
    cmsAdapter.loadMovie.mockResolvedValue(mockMovie);

    const expectedAverage = (5 + 1 + 4 + 3 + 5) / 5;
    const result = await getMovieRating('movie123');

    expect(result).toBe(expectedAverage);
  });

  test('Hämtar rating från IMDB om det finns färre än fem recensioner', async () => {
    const mockReviews = [
      { attributes: { rating: 8 } },
      { attributes: { rating: 7 } },
      { attributes: { rating: 9 } }
    ];

    const mockMovie = { imdbId: 'tt1234567' };

    cmsAdapter.loadReviews.mockResolvedValue(mockReviews);
    cmsAdapter.loadMovie.mockResolvedValue(mockMovie);

    imdbService.getImdbRating.mockResolvedValue(8.5);

    const result = await getMovieRating('movie123');

    expect(imdbService.getImdbRating).toHaveBeenCalledWith('tt1234567');
    expect(result).toBe(8.5);
  });

});