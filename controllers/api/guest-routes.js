const router = require('express').Router();
const { Guest, Mom, Answers } = require('../../models');

// GET all guests - /api/guests
router.get('/', (req, res) => {
    Guest.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(dbGuestData => res.json(dbGuestData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// GET one guest - /api/guests/(unique id of guest)
router.get('/:id', (req, res) => {
    Guest.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Mom,
                attributes: [
                    'id',
                    'name',
                    'email'
                ]
            },
            {
                model: Answers,
                attributes: [
                    'id',
                    'gender',
                    'weight_in_pounds',
                    'date_of_birth'
                ]
            }
        ],
    })
        .then(dbGuestData => {
            if (!dbGuestData) {
                res.status(404).json({ message: 'There is no guest by that id!' });
                return;
            }
            res.json(dbGuestData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST create one guest - /api/guests
router.post('/', (req, res) => {
    Guest.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mom_email: req.body.mom_email,
        mom_id: req.body.mom_id
    })
        .then(dbGuestData => {
            req.session.save(() => {
                req.session.guest_id = dbGuestData.id;
                req.session.name = dbGuestData.name;
                req.session.loggedIn = true;

                res.json(dbGuestData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST authorize guest in login - /api/guests/login
router.post('/login', (req, res) => {
    Guest.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(dbGuestData => {
            if (!dbGuestData) {
                res.status(400).json({ message: 'No guest with that email address!' });
                return;
            }

            const validatePassword = dbGuestData.checkPassword(req.body.password);

            if (!validatePassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.guest_id = dbGuestData.id;
                req.session.name = dbGuestData.name;
                req.session.loggedIn = true;

                res.json({ guest: dbGuestData, message: 'You are now logged in!' });
            });
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    Guest.update(req.body, {
        where: {
            individualHooks: true,
            id: req.params.id
        }
    })
        .then(dbGuestData => {
            if (!dbGuestData[0]) {
                res.status(404).json({ message: 'No guest found with this id' });
                return;
            }
            res.json(dbGuestData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE one guest - /api/guests
router.delete('/:id', (req, res) => {
    Guest.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbGuestData => {
            if (!dbGuestData) {
                res.status(404).json({ message: 'No guest found with this id' });
                return;
            }
            res.json(dbGuestData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;