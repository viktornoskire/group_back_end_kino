import express from 'express';
import createData from './db.js';
import { loadScreenings } from './screeningsFrontpage.js';
import { top5Movies } from './top5Movies.js';
import cmsScreening from './movies.js';
import { getMovieRating } from './rating.js';
import cmsAdapterRating from './cmsAdapterRating.js';
import cmsAdapter from './cmsAdapterTop5Movies.js';
import cmsReviews from '../static/cmsReviews.js';
import jsonwebtoken from 'jsonwebtoken';

export default function initialize(api) {
  const app = express();
  app.set('view engine', 'pug');

  app.get('/', async (req, res) => {
    res.render('home', {
      data: createData(),
    });
  });

  app.get('/api/top-movies', async (req, res) => {
    try {
      const movies = await top5Movies(cmsAdapter);
      res.json({
        movies: movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          image: movie.image,
        })),
      });
    } catch (error) {
      console.error('Could not get top 5 movies', error);
      res.status(500).json({ error: 'Could not load top 5 movies at this time.' });
    }
  });

  app.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const movie = await api.loadMovie(id);

      if (!movie) {
        return res.status(404).render('404', { data: createData() });
      }

      res.render('movie', {
        data: createData(),
        movie: movie,
        movieId: id,
      });
    } catch (err) {
      console.error(err.message);
      res.status(404).render('404', { data: createData() });
    }
  });

  app.get('/api/reviews/:id/:page', async (req, res) => {
    const id = req.params.id;
    const page = req.params.page || 1;
    const pageSize = 5;

    try {
      const dataReview = await api.getReviews(cmsReviews, id, page, pageSize);

      if (!dataReview || dataReview.reviews.length == 0) {
        return res.status(500).json({ error: 'Recensioner hittades inte' });
      }

      res.json({
        reviews: dataReview.reviews.map((review) => ({
          author: review.author,
          rating: review.rating,
          comment: review.comment,
        })),
        pagination: dataReview.pagination,
      });
    } catch (err) {
      console.error(err.message);
      res.status(404);
    }
  });

  app.get('/about', async (req, res) => {
    res.render('about', { data: createData() });
  });

  app.get('/kids', async (req, res) => {
    res.render('kids', { data: createData() });
  });

  app.get('/api/screenings', async (req, res) => {
    try {
      const screenings = await loadScreenings();
      res.json(screenings);
    } catch (error) {
      console.error('Fel vid hämtning av visningar:', error);
      res.status(500).json({ error: 'Kunde inte ladda visningar' });
    }
  });

  app.get('/api/screenings/:id', async (req, res) => {
    try {
      const movieID = req.params.id;
      const screenings = await cmsScreening.loadScreeningsID(req, res);
      const rating = await getMovieRating(cmsAdapterRating, movieID);
      console.log(rating);

      if (!screenings) {
        throw new Error('Array does not contain any screenings.');
      }

      res.json({
        data: screenings,
        rating: rating,
      });
    } catch (e) {
      console.error(`Problems with fetching the screenings, ${e}`);
      res.status(500).json({ message: 'Could not fetch any screenings' });
    }
  });

  const LOGIN = [
    {
      username: 'viktor',
      password: 'wilma',
    },
    {
      username: 'rikard',
      password: 'rikard3209',
    },
    {
      username: 'johnny',
      password: 'zidust',
    },
    {
      username: 'johannes',
      password: 'spinalglitter38',
    },
    {
      username: 'louise',
      password: 'lillamylouise',
    },
    {
      username: 'emily',
      password: 'emily_92251',
    },
    {
      username: 'oscar',
      password: 'oscar0709',
    },
  ];
  const USERNAME = "admin";
  const PASSWORD = "secret";
  const SECRET = "averylongpasswordthattheonlyonewhoknowswhatitisisthiscomputercodeblock";

  app.post("/api/login", (req, res) => {
    const authHeader = req.headers.authorization;
    const b64credentials = authHeader.slice(6);
    const credentials = atob(b64credentials);
    const fields = credentials.split(":");
    const username = fields[0];
    const password = fields[1];
    console.log("Username:", username);
    console.log("Password:", password);

    if (
      (
        username == LOGIN[0].username && password == LOGIN[0].password ||
        username == LOGIN[1].username && password == LOGIN[1].password ||
        username == LOGIN[2].username && password == LOGIN[2].password ||
        username == LOGIN[3].username && password == LOGIN[3].password ||
        username == LOGIN[4].username && password == LOGIN[4].password ||
        username == LOGIN[5].username && password == LOGIN[5].password ||
        username == LOGIN[6].username && password == LOGIN[6].password 
      )
    ) {
      const jwt = jsonwebtoken.sign(
        {
          username: username,
          role: 'reviewer',
        },
        SECRET
      );

      res.status(200).json({
        ok: true,
        token: jwt,
      });
    } else {
      res.status(401).end();
    }
  });

  app.get("/api/reviews", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.slice(7);

    try {
      const payload = jsonwebtoken.verify(token, SECRET);
      res.status(200).json({
        ok: true,
      });
    } catch (error) {
      res.status(401).json({
        ok: false,
        error: "not allowed",
      });
    }
  });

  app.use('/static', express.static('./static'));
  app.use('/img', express.static('./public/img'));
  app.use('/movies/static', express.static('./static'));
  app.use('/movies/img', express.static('./public/img'));

  app.use(function (req, res) {
    res.status(404).render('404', { data: createData() });
  });

  return app;
}
