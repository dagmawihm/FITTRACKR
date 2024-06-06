 // Adjust the path as necessary

// Connect to MongoDB





const mongoose = require('mongoose');
const Exercise = require('./exercise'); // adjust the path as necessary

const exerciseData = [
    { muscleGroup: 'chest', exercises: [
        'Flat Bench Press', 'Incline Bench Press', 'Butterfly Machine', 'Decline Bench Press', 
        'Chest Flyes', 'Push-Ups', 'Cable Crossovers'
    ]},
    { muscleGroup: 'triceps', exercises: [
        'Overhead Extension', 'Cable Pushdowns', 'Close Grip Pressing', 'Dips', 
        'Skull Crushers', 'Tricep Kickbacks', 'Diamond Push-Ups', 'Reverse Grip Tricep Pushdown'
    ]},
    { muscleGroup: 'shoulders', exercises: [
        'Lateral Raises', 'Face Pull', 'Overhead Press', 'Upright Rows', 
        'Arnold Press', 'Front Raises', 'Reverse Pec Deck Fly', 'Shrugs'
    ]},
    { muscleGroup: 'back', exercises: [
        'Lat Pulldowns', 'Row', 'Pull-ups', 'Deadlifts', 
        'T-Bar Row', 'Single Arm Dumbbell Row', 'Good Mornings', 'Hyperextensions'
    ]},
    { muscleGroup: 'biceps', exercises: [
        'Incline Dumbbell Curls', 'Behind the Body Cable Curls', 'Preacher Curl', 
        'Concentration Curls', 'Hammer Curls', 'Cable Curls', '21s'
    ]},
    { muscleGroup: 'forearm', exercises: [
        'Wrist Curls', 'Reverse Wrist Curls', "Farmer's Walk", 
        'Hammer Curls', 'Reverse Curls', 'Forearm Squeezes', 'Zottman Curls'
    ]},
    { muscleGroup: 'core', exercises: [
        'Plank', 'Hanging Leg Raises', 'Russian Twists', 
        'Sit-Ups', 'Bicycle Crunches', 'Ab Rollouts', 'Mountain Climbers'
    ]},
    { muscleGroup: 'quadriceps', exercises: [
        'Hack Squats', 'Leg Extension', 'Barbell Squats', 'Leg Presses', 
        'Bulgarian Split Squats', 'Front Squats', 'Step-Ups', 'Sissy Squats'
    ]},
    { muscleGroup: 'hamstrings', exercises: [
        'Seated Leg Curl', 'Lying Leg Curls', 'Stiff Legged Deadlift', 
        'Good Mornings', 'Romanian Deadlifts', 'Single-Leg Deadlift', 'Glute-Ham Raises'
    ]},
    { muscleGroup: 'glutes', exercises: [
        'Front Foot Elevated Lunges', 'Hip Thrust', 'Seated Hip Adduction (Outer Thigh)', 
        'Glute Bridges', 'Sumo Deadlifts', 'Cable Kickbacks', 'Step-Ups'
    ]},
    { muscleGroup: 'calves', exercises: [
        'Straight Leg Calf Exercises', 'Seated Calf Raises', 'Calf Press', 
        'Donkey Calf Raises', 'Box Jumps', 'Jump Rope', 'Single-Leg Calf Raises'
    ]}
];

async function seedDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/fittracker');

        // Clear the collection
        await Exercise.deleteMany({});
        
        // Insert the data
        await Exercise.insertMany(exerciseData);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();
