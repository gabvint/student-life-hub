const mongoose = require('mongoose');



const assignmentSchema = new mongoose.Schema({
   
    title: {
        type: String, 
        required: true, 
    }, 
  
    description: {
        type: String, 
    }, 
  
    dueDate: {
        type: Date, 
        required: true, 
    }, 
  
    progress: {
        type: String,
        enum: ['Not yet Started', 'In progress', 'For checking', 'Done'],
        required: true, 
    }, 
  
    link: {
        type: String, 
    }, 
  
    grade: {
        type: Number,
    }
  
  })

  module.exports = assignmentSchema;