const router = require("express").Router();
const Movie = require('../models/Movie.model.js');

// all routes

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(allMovies => {
        console.log('Retrieved movies from DB:', allMovies);
        res.render ('movies/movies', {movies: allMovies});
    })
    .catch(error => {
        console.log('Error while getting the books from the DB: ', error);
        next(error);
      });
});


router.get('/movies/create', (req, res, next) => {
    res.render('movies/new-movie')
});
 
router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
      .then(theMovie => res.render('movies/movie.details.hbs', { movie: theMovie }))
      .catch(error => {
        console.log('Error while retrieving book details: ', error);
        next(error);
      });
  });

  router.get('/movies/:id/edit', (req, res, next) => {
    const { id } = req.params;
   
 Movie.findById(id)
      .then(movieEdit => {
        // console.log(bookToEdit);
        res.render('movies/edit-movie.hbs', { movie: movieEdit }); // <-- add this line
      })
      .catch(error => next(error));
  });
   


// post

router.post('/movies/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    console.log(req.body);

    Movie.create({ title, genre, plot,cast  })
        .then(moviefromDB => {
            res.redirect('/movies')
            console.log(`New  movie created: ${moviefromDB.name}.`)
        })
        .catch(error => next(error));
});

router.post('/movies/:id/delete', (req, res, next) => {
    const { id } = req.params;
   
    Movie.findByIdAndDelete(id)
      .then(() => res.redirect('/movies'))
      .catch(error => next(error));
  });

  router.post('/movie/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;
   
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
      .then(updatedMovie => res.redirect(`/movies`)) // go to the details page to see the updates
      .catch(error => next(error));
  });

module.exports = router;