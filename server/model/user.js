const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WeightHistorySchema = new Schema({
    date: { type: Date, required: true },
    weight: { type: Number, required: true }
});


const SetSchema = new Schema({
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    reps: { type: Number, required: true }
});


const WorkoutSchema = new Schema({
    exerciseName: { type: String, required: true },
    isActive: { type: Boolean, required: [true, 'Active Status is required'] },
    desiredSets: { type: Number, required: [true, 'Desired sets are required'] },
    setsHistory: [SetSchema]
});


const ExerciseSchema = new Schema({
    muscleGroup: { type: String, required: true },
    workouts: [WorkoutSchema]
});


const UserSchema = new Schema({
    firstName: { type: String, required: [true, 'First Name is required'] },
    lastName: { type: String, required: [true, 'Last Name is required'] },
    sex: { type: String, enum: ['male', 'female'], required: [true, 'Sex is required'] },
    ft: { type: Number },
    in: { type: Number },
    dob: { type: Date },
    email: { type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    emailSubscriptions: { type: Boolean, required: [true, 'Email Subscription preference is required'], default: true },
    weightHistory: [WeightHistorySchema],
    exercises: [ExerciseSchema]
}, { timestamps: true });



module.exports = mongoose.model('User', UserSchema);
