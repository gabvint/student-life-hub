const mongoose = require('mongoose');

const expensesSchema = new mongoose.Schema({

    description: {
        type: String, 
        required: true,
    }, 
    date: {
        type: Date,
        required: true,
    }, 
    amount: {
        type: Number,
        required: true,
    },

})

module.exports = expensesSchema