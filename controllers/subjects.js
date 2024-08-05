const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


// Everything starts with /users/:userId/subjects

router.get('/', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)

        // finds all the subjects and assignments
        res.render('subjects/index.ejs', {
            subject: currUser.subjects, 
            assignment: currUser.subjects.assignments,
        })


    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req, res) => {

    try {
        // look up the user from req.session 
        const currentUser = await User.findById(req.session.user)
        const subjectName = req.body.name
        const assignment = req.body
        
        // since these fields aren't required, we are temporarily storing values for it 
        if (assignment.notes === ''){
            assignment.notes = 'none'
        }
        if (assignment.link === ''){
           assignment.link = 'none'
        } 
        if (assignment.grade === ''){
            assignment.grade = 0
        }

        // finds if there is an existing subject in the db
        let subject = currentUser.subjects.find(subject => subject.name === subjectName)

        // if no subject exists, create a new subject and then store the assignments in it
        if (subject === undefined) {
            subject = { name: subjectName, assignments: [assignment]}
            currentUser.subjects.push(subject)
         
        // if the subject already exists, this just add the assignment under the subject
        } else{
            subject.assignments.push(assignment)
        }

        // Save the updated user document
        await currentUser.save();

        res.redirect(`/users/${req.session.user._id}/subjects`)

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
      
})


router.get('/:subjectId/:assignmentId/edit', async (req, res) => {
    try {

        const currUser = await User.findById(req.session.user._id)
        const subject = currUser.subjects.id(req.params.subjectId)
        const assignment = subject.assignments.id(req.params.assignmentId)

        // formatting for date
        // Adjust the date to the local timezone by subtracting the timezone offset
        // this ensures that when the date is displayed, it will not add another day :(
        const dueDate = new Date(assignment.dueDate)
        const localDate = new Date(dueDate.getTime() - (dueDate.getTimezoneOffset() * 60000))
        const dueDateFormatted = localDate.toISOString().split('T')[0]

        // formatting for time
        const time = assignment.time

        res.render('subjects/edit.ejs', {
            subject: subject, 
            assignment: assignment,
            date: dueDateFormatted,
            time: time,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')   
    }
})

router.put('/:subjectId/:assignmentId', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)
        const subject = currUser.subjects.id(req.params.subjectId)
        const assignment = subject.assignments.id(req.params.assignmentId)

        subject.set(req.body)
        assignment.set(req.body)


        await currUser.save()

        res.redirect(`/users/${req.session.user._id}/subjects/${req.params.subjectId}/${req.params.assignmentId}/edit`)
    } catch (error) {
        
    }
})

// router to delete assignment
router.delete('/:subjectId/:assignmentId', async (req, res) => {
    try {
        const currUser = await User.findById(req.session.user._id)
        const subject = currUser.subjects.id(req.params.subjectId)
        const assignment = subject.assignments.id(req.params.assignmentId)

        assignment.deleteOne()

        await currUser.save() // Save the changes to the user document

        res.redirect(`/users/${req.session.user._id}/subjects`)
        
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

// router to delete subject 
// router.delete('/:subjectId', async (req, res) => {
//     try {
//         const currUser = await User.findById(req.session.user._id)
//         const subject = currUser.subjects.id(req.params.subjectId)

//         if (subject.assignments.length > 0){
//             res.send(`You cannot delete this subject because you still have pending assignments!`)
//         } else {
//             subject.deleteOne()
//             await currUser.save() 
//         }

//         res.redirect(`/users/${req.session.user._id}/subjects`)
        
//     } catch (error) {
//         console.log(error)
//         res.redirect('/')
//     }
// })



module.exports = router