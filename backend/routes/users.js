const express = require('express');
const router = express.Router();
let User = require('../models/user-model');


//ROUTES    


router.get('/', (req, res) => {
    console.log()
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('ERROR: ' + err));
})

router.post('/', (req, res) => {
    const username = req.body.username;

    const newUser = new User({ username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(500).json('ERROR: ' + err));
})

module.exports = router;
