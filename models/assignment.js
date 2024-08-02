const mongoose = require('mongoose');


const assignmentSchema = new mongoose.Schema({
   
    name: {
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
        enum: ['Not yet Started', 'In progress', 'For checking', 'Done']
    }, 

    links: {
        type: String, 
    }, 

    grade: {
        type: Number,
    }

})


module.exports = assignmentSchema;
