const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)

        res.render('expenses/index.ejs', {
            user: currUser,
        })

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)
        


    }catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
module.exports = router