const router = require('express').Router();
const { Answers, Guest } = require('../../models');

// get all guests
router.get('/', (req, res) => {
    Answers.findAll({
        // query configuration
        attributes: ['id', 'gender', 'weight_in_pounds', 'date_of_birth', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Guest,
                attributes: ['name']
            }
        ]
    })
    .then(dbAnswersData => res.json(dbAnswersData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a single answer
router.get('/:id', (req, res) => {
    Answers.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'gender', 'weight_in_pounds', 'date_of_birth', 'created_at'],
        include: [
            {
                model: Guest,
                attributes: ['name']
            }
        ]
    })
    .then(dbAnswersData => {
        if(!dbAnswersData) {
            res.status(404).json({ message: 'No answer found with this id' });
            return;
        }
        res.json(dbAnswersData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// creat post route
router.post('/', (req, res) => {
    Answers.create({
        // using req.body to populate the columns in the answers table.
        gender: req.body.gender,
        weight_in_pounds: req.body.weight_in_pounds,
        date_of_birth: req.body.date_of_birth,
        guest_id: req.body.guest_id
    })
    .then(dbAnswersData => res.json(dbAnswersData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete route
router.delete('/:id', (req, res) => {
    Answers.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbAnswersData => {
        if(!dbAnswersData) {
            res.status(400).json({ message: 'No answer found with this id'});
            return;
        }
        res.json(dbAnswersData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;