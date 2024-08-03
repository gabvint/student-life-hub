const mongoose = require('mongoose');
const assignmentSchema = require('./assignment.js');


const subjectSchema = new mongoose.Schema({
    
    name: {
        type: String, 
        required: true,
    }, 
    assignments: [assignmentSchema],
    
  })



module.exports = subjectSchema