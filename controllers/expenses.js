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
        const currUser = await User.findById(req.session.user)

        let newExpense = {
            description: req.body.description, 
            date: req.body.date, 
            amount: req.body.amount,
        }

        currUser.expenses.push(newExpense)

        await currUser.save();

        res.redirect(`/users/${req.session.user._id}/expenses`)

    }catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
module.exports = router