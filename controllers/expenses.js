const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)
        const expenses = currUser.expenses
        res.render('expenses/index.ejs', {
            user: currUser,
            expenses: expenses,
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

router.get('/:expensesId/edit', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)
        const expense = currUser.expenses.id(req.params.expensesId)

        //formatting for the date 
        const date = new Date(expense.date)
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        const dateFormatted = localDate.toISOString().split('T')[0]


        res.render('expenses/edit.ejs', {
            expense: expense, 
            date: dateFormatted, 
        })
    
    } catch (error) {
        console.log(error)
        res.redirect('/')

    }
})

module.exports = router