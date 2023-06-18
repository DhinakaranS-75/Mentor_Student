const mongoose = require('mongoose');


const mentorSchema = new mongoose.Schema({
  name: String,
});

const Mentor = mongoose.model('Mentor', mentorSchema);


const studentSchema = new mongoose.Schema({
  name: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = { Mentor, Student };
