import express from 'express';
import createData from './db.js';
import { loadScreenings } from './screeningsFrontpage.js';
import { loadReview } from './movies.js';

import cmsScreening from './movies.js';

export default function initialize(api) {
  const app = express();
  app.set('view engine', 'pug');

  app.get('/', async (req, res) => {
    const movies = await api.loadMovies();
    res.render('home', {
      data: createData(),
      movies: movies,
    });
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
        movieId: id

      });
    } catch (err) {
      console.error(err.message);
      res.status(404).render("404", { data: createData(), });
      console.error(err.message);
      res.status(404).render("404", { data: createData(), });
    }
  });

  app.get('/api/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;


    try {
      const dataReview = await loadReview(id, pageSize, page);
      
      if (!dataReview || !dataReview.data) {
        return res.status(404).json({ error: "Recensioner hittades inte" });
    }
    
      res.json({
        reviews: dataReview.data.map(review => ({
          author: review.attributes.author,
          rating: review.attributes.rating,
          comment: review.attributes.comment,
        })),
        pagination: dataReview.meta.pagination
      });

    } catch (err) {
      console.error(err.message);
      res.status(404)
    };
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
      console.error("Fel vid hämtning av visningar:", error);
      res.status(500).json({ error: "Kunde inte ladda visningar" });
    }
  });

  app.get('/api/screenings/:id', async (req, res) => {
    const id = req.params.id;
    res.status(200).end();
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
