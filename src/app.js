import express from 'express';
import createData from './db.js';

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

      });
    } catch (err) {
      console.error(err.message);
      res.status(404).render("404", { data: createData(), });
    }
  });

  app.get('/api/reviews/:id', async (req, res) => {
    const id = req.params.id;
    const page = req.query.page || 1;
    const pageSize = 5;

    const api = 'https://plankton-app-xhkom.ondigitalocean.app/api/reviews';

    const skip = (page - 1) * pageSize;

    const revURL = `${api}?filters[movie]=${id}&pagination[pageSize]=${pageSize}&pagination[page]=${skip}`;
    try {
      const response = await fetch(revURL);
      const dataReview = await response.json();

      res.json({
        reviews: dataReview.dataReview.map(review => ({
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

  app.use('/static', express.static('./static'));
  app.use('/img', express.static('./public/img'));
  app.use('/movies/static', express.static('./static'));
  app.use('/movies/img', express.static('./public/img'));

  app.use(function (req, res) {
    res.status(404).render('404', { data: createData() });
  });

  return app;
}
