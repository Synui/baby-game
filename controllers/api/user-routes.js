const router = require('express').Router();
const { User } = require('../../models');

// GET all users - /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { 
            exclude: ['password'] 
        }
    })
    .then(userInfo => res.json(userInfo))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// GET one user - /api/users/(unique id of user)
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { 
            exclude: ['password'] 
        },
        where: {
            id: req.params.id
        },
    })
    .then(userInfo => {
        if (!userInfo) {
            res.status(404).json({ message: 'There is no user by that id!'});
            return;
        }
        res.json(userInfo);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST create one user - /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userInfo => {
        req.session.save(() => {
            req.session.user_id = userInfo.id;
            req.session.username = userInfo.username;
            req.session.loggedIn = true;

            res.json(userInfo);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST authorize user in login - /api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userInfo => {
        if (!userInfo) {
            res.status(400).json({ message: 'No user with that email address!'});
            return;
        }

        const validatePassword = userInfo.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userInfo.id;
            req.session.username = userInfo.username;
            req.session.loggedIn =  true;

            res.json({ user: userInfo, message: 'You are now logged in!'});
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
    User.update(req.body, {
        where: {
            individualHooks: true,
            id: req.params.id
        }
    })
        .then(userInfo => {
            if (!userInfo[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE one user - /api/users
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userInfo => {
            if (!userInfo) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(userInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;