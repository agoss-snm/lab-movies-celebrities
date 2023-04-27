const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js');

// all your routes here
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(allCelebrities => {
            console.log('Retrieved celebrities from DB:', allCelebrities);
            res.render('celebrities/celebrities', { celebrities: allCelebrities });
        })
        .catch(error => {
            console.log('Error while getting the books from the DB: ', error);
            next(error);
        });
});


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});


router.get('/celebrities/:id', (req, res, next) => {
    const { id } = req.params;
    Celebrity.findById(id)
      .then(theCelebritie => res.render('celebrities/celebritie-detail.hbs', { celebritie: theCelebritie }))
      .catch(error => {
        console.log('Error while retrieving book details: ', error);
        next(error);
      });
  });

  router.get('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params;
   
    Celebrity.findById(id)
      .then(celebritieEdit => {
        // console.log(bookToEdit);
        res.render('celebrities/edit-celebritie.hbs', { celebritie: celebritieEdit }); // <-- add this line
      })
      .catch(error => next(error));
  });

//pos methods

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    console.log(req.body);

    Celebrity.create({ name, occupation, catchPhrase })
        .then(celebrityFromDB => {
            res.redirect('/celebrities')
            console.log(`New celebrity created: ${celebrityFromDB.name}.`)

        })
        .catch(error => next(error));
});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params;
    const { name, occupation, catchPhrase} = req.body;
   
    Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase}, { new: true })
      .then(updateCelebritie => res.redirect(`/celebrities`)) // go to the details page to see the updates
      .catch(error => next(error));
  });

  router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params;
   
    Celebrity.findByIdAndDelete(id)
      .then(() => res.redirect('/celebrities'))
      .catch(error => next(error));
  });


module.exports = router;