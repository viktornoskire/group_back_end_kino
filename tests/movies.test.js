import { test, expect } from '@jest/globals';
import request from 'supertest';
import initialize from '../src/app.js';

const api = {
  loadMovie: async (id) => {
    const movies = [
      {
        id: 2,
        title: 'Encanto',
        image: {
          url: 'https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg',
        },
      },
      {
        id: 5,
        title: 'The Muppets',
        image: {
          url: 'https://m.media-amazon.com/images/M/MV5BMjE0MTM4NTc3NF5BMl5Ban',
        },
      },
      {
        id: 10,
        title: 'Training Day',
        image: {
          url: 'https://m.media-amazon.com/images/M/MV5BMjRlNjUwOGYtNGQxZS00Zj',
        },
      },
      {
        id: 6,
        title: 'Forrest Gump',
        image: {
          url: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
        },
      },
    ];

    const movie = movies.find((m) => m.id === parseInt(id));
    return movie || null
  },
  loadMovies: async () => [
    {
      id: 2,
      title: 'Encanto',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg',
      },
    },
    {
      id: 5,
      title: 'The Muppets',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BMjE0MTM4NTc3NF5BMl5Ban',
      },
    },
    {
      id: 10,
      title: 'Training Day',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BMjRlNjUwOGYtNGQxZS00Zj',
      },
    },
    {
      id: 6,
      title: 'Forrest Gump',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      },
    },
  ],
};

test('Are the correct movies displayed on main page?', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/);

  expect(res.text).toMatch('Encanto');
  expect(res.text).toMatch('Forrest Gump');
  expect(res.text).toMatch('The Muppets');
  expect(res.text).toMatch('Training Day');
});

test('Is Encanto displayed on single movie page?', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/movies/2')
    .expect(200)
    .expect('Content-Type', /html/);

  expect(res.text).toMatch('Encanto');
});

test('Is Forrest Gump displayed on single movie page?', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/movies/6')
    .expect(200)
    .expect('Content-Type', /html/);

  expect(res.text).toMatch('Forrest Gump');
});

test('Test the non-existing "localhost:5080/movies/11" page', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/movies/11')
    .expect(404)
    .expect('Content-Type', /html/);

  expect(res.text).toMatch('Not Found');
});

test('Test the non-existing "localhost:5080/movies/0" page', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/movies/0')
    .expect(404)
    .expect('Content-Type', /html/);

  expect(res.text).toMatch('Not Found');
});
