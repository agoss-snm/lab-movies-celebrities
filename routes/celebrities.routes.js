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

module.exports = router;