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

        res.render('expenses/edit.ejs', {
            expense: expense, 
         
        })
    
    } catch (error) {
        console.log(error)
        res.redirect('/')

    }
})

router.put('/:expenseId', async (req, res) => {
    try {

        const currUser = await User.findById(req.session.user._id)
        const expenses = currUser.expenses.id(req.params.expenseId)

        expenses.set(req.body)

        await currUser.save()
        
        res.redirect(`/users/${req.session.user._id}/expenses`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:expenseId', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)
        const expense = currUser.expenses.id(req.params.expenseId)

        expense.deleteOne()
        await currUser.save()

        res.redirect(`/users/${req.session.user._id}/expenses`)

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

})

module.exports = router