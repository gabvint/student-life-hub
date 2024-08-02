const mongoose = require('mongoose');
const assignmentSchema = require('./assignment.js');


const subjectSchema = new mongoose.Schema({
    
    name: {
        type: String, 
        enum: ['Math', 'Science', 'Physical Education', 'Art', 'Foreign Language', 'History', 'Music', 'Computer'],
        required: true,
    }, 
    assignment: [assignmentSchema],
  
  })


module.exports = subjectSchema