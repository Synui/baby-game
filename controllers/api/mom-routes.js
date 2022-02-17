const router = require('express').Router();
const { Mom, Guest, Post } = require('../../models');
// const withAuth = require('../../utils/auth');

// GET all Moms - /api/Moms
router.get('/', (req, res) => {
    Mom.findAll({
        attributes: { 
            exclude: ['password'] 
        }
    })
    .then(dbMomData => res.json(dbMomData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// GET one Mom - /api/moms/(unique id of Mom)
router.get('/:id', (req, res) => {
    Mom.findOne({
        attributes: { 
            exclude: ['password'] 
        },
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title'
                ]
            },
            {
                model: Guest,
                attributes: [
                    'id',
                    'name',
                    'email'
                ]
            }
        ],
        where: {
            id: req.params.id
        },
    })
    .then(dbMomData => {
        if (!dbMomData) {
            res.status(404).json({ message: 'There is no mom by that id!'});
            return;
        }
        res.json(dbMomData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST create one umom - /api/moms
router.post('/', (req, res) => {
    Mom.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
    })
    .then(dbMomData => {
        req.session.save(() => {
            req.session.mom_id = dbMomData.id;
            req.session.name = dbMomData.name;
            req.session.loggedIn = true;

            res.json(dbMomData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST authorize mom in login - /api/moms/login
router.post('/mom/login', (req, res) => {
    Mom.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbMomData => {
        if (!dbMomData) {
            res.status(400).json({ message: 'No mom with that email address!'});
            return;
        }

        const validatePassword = dbMomData.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }

        req.session.save(() => {
            req.session.mom_id = dbMomData.id;
            req.session.name = dbMomData.name;
            req.session.loggedIn =  true;

            res.json({ mom: dbMomData, message: 'You are now logged in!'});
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

router.put('/:id', (req,res) => {
    Mom.update(req.body, {
        where: {
            individualHooks: true,
            id: req.params.id
        }
    })
        .then(dbMomData => {
            if (!dbMomData[0]) {
                res.status(404).json({ message: 'No mom found with this id' });
                return;
            }
            res.json(dbMomData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE one mom - /api/moms
router.delete('/:id', (req, res) => {
    Mom.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbMomData => {
            if (!dbMomData) {
                res.status(404).json({ message: 'No mom found with this id' });
                return;
            }
            res.json(dbMomData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;