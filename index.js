const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());


mongoose.connect('mongodb+srv://dhinakaran75493:dhinakaran75493@login-register.lkjv8kv.mongodb.net/Class_details?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB ');
    
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas', err);
  });


  
const { Mentor, Student } = require('./models');


app.post('/mentors', async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create mentor' });
  }
});


app.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});


app.put('/students/:studentId/assign/:mentorId', async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;
    const student = await Student.findByIdAndUpdate(studentId, { mentor: mentorId }, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign mentor to student' });
  }
});


app.put('/mentors/:mentorId/add-students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const { students } = req.body;
    const updatedMentor = await Mentor.findByIdAndUpdate(mentorId, { $push: { students: { $each: students } } }, { new: true });
    res.json(updatedMentor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add students to mentor' });
  }
});


app.put('/students/:studentId/assign-mentor/:mentorId', async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;
    const student = await Student.findByIdAndUpdate(studentId, { mentor: mentorId }, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign/change mentor for student' });
  }
});


app.get('/mentors/:mentorId/students', async (req, res) => {
  try {
    const { mentorId } = req.params;
    const students = await Student.find({ mentor: mentorId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/students/:studentId/previous-mentor', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('mentor');
    const previousMentor = student.mentor;
    res.json(previousMentor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch previous mentor' });
  }
});
