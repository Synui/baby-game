const router = require('express').Router();
const { Post, Mom, Guest, Answers } = require('../models');
// const withAuth = require('../utils/auth');

// GET all post by user in dashboard - /dashboard
router.get('/', (req, res) => {
    Answers.findAll({
        where: {
            // use the ID from the session
            guest_id: req.session.guest_id
        },
        attributes: [
            'id',
            'gender',
            'weight_in_pounds',
            'date_of_birth',
            'guest_id'
        ],
        include: [
            {
                model: Guest,
                attributes: [
                    'id',
                    'name',
                    'email'
                ]
            }
        ]
    })
        .then(dbAnswerData => {
            // serialize data before passing to template
            const answers = dbAnswerData.map(post => post.get({ plain: true }));
            res.render('dashboard', {
                answers,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;