const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const assignmentSchema = require('../models/assignment.js');

// /users/:userId/subjects

router.get('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id);

        res.render('subjects/index.ejs', {
            subject: currUser.subjects, 
            assignment: currUser.subjects.assignment,
        })


    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {

    try {
        // look up the user from req.session 
        const currentUser = await User.findById(req.session.user);
        const subjectName = req.body.name;
        const assignment = req.body;
        
        if (assignment.notes === ''){
            assignment.notes = 'none';
        }
        if (assignment.link === ''){
           assignment.link = 'none';
        } 
        if (assignment.grade === ''){
            assignment.grade = 0;
        }
        let subject = currentUser.subjects.find(subject => subject.name === subjectName);

        if (subject === undefined) {
            subject = { name: subjectName, assignments: [assignment]};
            currentUser.subjects.push(subject);
            console.log('pasok here')
        } else{
            subject.assignments.push(assignment);
        }
        

        // Save the updated user document
        await currentUser.save();

        res.redirect(`/users/${req.session.user._id}/subjects`)

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
      
})


module.exports = router