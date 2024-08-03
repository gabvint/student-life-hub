const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const assignmentSchema = require('../models/assignment.js');

// /users/:userId/subjects

router.get('/', async (req, res) => {
    try {

        res.render('subjects/index.ejs')

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
    
        let subject = currentUser.subjects.find(subject => subject.name === subjectName);

        if (!subject) {
            subject = { name: subjectName, assignments: [] };
            currentUser.subjects.push(subject);
        }

        // Push the assignment to the subject's assignments array
        subject.assignments.push(req.body);

        console.log(req.body)
        // Save the updated user document
        await currentUser.save();

        res.redirect(`/users/${req.session.user._id}/subjects`)

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
      


})


module.exports = router