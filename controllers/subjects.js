const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// /users/:userId/subjects

router.get('/', async (req, res) => {
    try {

        res.render('subjects/index.ejs')

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
        // look up the user from req.session 
        const currentUser = await User.findById(req.session.user)

        // push req.body to applications array of the current user 
        currentUser.subjects.push(req.body)
    
        // save 
        await currentUser.save()
})


module.exports = router