const mongoose = require('mongoose');
const assignmentSchema = require('./assignment.js');

const subjectSchema = new mongoose.Schema({
    
    name: {
        enum: ['Math', 'Science', 'Physical Education', 'Art', 'Foreign Language', 'History', 'Music', 'Computer' ],
        required: true,
    }, 
    description: {
        type: String, 
    }, 

    assignment: [assignmentSchema]

})
module.exports = subjectSchema