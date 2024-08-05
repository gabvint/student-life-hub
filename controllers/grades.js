const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)

        // finds all the subjects and assignments
        res.render('grades/index.ejs', {
            subject: currUser.subjects, 
         
        })


    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router