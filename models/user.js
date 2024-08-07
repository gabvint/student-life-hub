const mongoose = require('mongoose');
const subjectSchema = require('./subject.js');
const expensesSchema = require('./expenses.js');

const userSchema = mongoose.Schema({
  
  firstName: {
    type: String, 
    required: true,
  }, 

  lastName: {
    type: String, 
    required: true,
  }, 

  email: {
    type: String, 
    required: true, 
  }, 

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  subjects: [subjectSchema],

  expenses: [expensesSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
