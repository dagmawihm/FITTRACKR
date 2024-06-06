const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    muscleGroup: { type: String, required: true },
    exercises: [{ type: String, required: true }]
});


module.exports = mongoose.model('Exercise', ExerciseSchema);