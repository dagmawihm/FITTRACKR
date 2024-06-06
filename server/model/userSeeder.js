// const mongoose = require('mongoose');
// const User = require('./user'); // Import the User model

// mongoose.connect('mongodb://127.0.0.1:27017/fittracker'); // Connect to MongoDB

// const userEmail = 'eliasarsema466@gmail.com';

// // Function to generate random weight data for 3 years
// // Function to generate random weight data for 3 years
// const generateWeightData = () => {
//     const weightData = [];
//     let currentDate = new Date('2022-01-01'); // Start date: January 1st, 2022
//     const endDate = new Date('2024-05-30'); // End date: January 1st, 2025

//     // Loop through each day between start and end dates
//     while (currentDate < endDate) {
//         // Generate a random weight between 50 and 100 (example)
//         const weight = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

//         // Add date and weight to the array
//         weightData.push({ date: new Date(currentDate), weight });

//         // Move to the next day
//         currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return weightData;
// };


// // Function to push weight data to weightHistory array
// const pushWeightData = async () => {
//     try {
//         // Find the user by email
//         const user = await User.findOne({ email: userEmail });

//         if (!user) {
//             console.log('User not found');
//             return;
//         }

//         // Generate weight data
//         const weightData = generateWeightData();

//         // Push weight data to weightHistory array
//         user.weightHistory.push(...weightData);

//         // Save the updated user data
//         await user.save();

//         console.log('Weight data pushed successfully');
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         mongoose.disconnect(); // Disconnect from MongoDB
//     }
// };

// // Call the function to push weight data
// pushWeightData();






const mongoose = require('mongoose');
const User = require('./user'); // Import your User model
const moment = require('moment');
 mongoose.connect('mongodb://127.0.0.1:27017/fittracker'); // Connect to MongoDB
// Function to generate random weight and reps for sets
 //Function to generate random weight and reps for sets
function generateRandomWeightAndReps() {
    const weight = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random weight between 50 and 100
    const reps = Math.floor(Math.random() * (15 - 5 + 1)) + 5; // Random reps between 5 and 15
    return { weight, reps };
}

// Function to seed set history
async function seedSetHistory() {
    try {
        const user = await User.findOne({ email: "dagmawihm@gmail.com" });
        if (!user) {
            console.error("User not found");
            return;
        }

        const chestExercise = user.exercises.find(exercise => exercise.muscleGroup === "chest");
        if (!chestExercise) {
            console.error("Chest exercise not found");
            return;
        }

        const flatBenchPress = chestExercise.workouts.find(workout => workout.exerciseName === "Flat Bench Press");
        if (!flatBenchPress) {
            console.error("Flat Bench Press exercise not found");
            return;
        }

        const startDate = moment('2022-01-01');
        const endDate = moment('2024-05-30');
        const currentDate = startDate.clone();

        while (currentDate.isSameOrBefore(endDate)) {
            for (let i = 0; i < 3; i++) {
                const { weight, reps } = generateRandomWeightAndReps();
                flatBenchPress.setsHistory.push({
                    date: currentDate.toDate(),
                    weight,
                    reps
                });
            }
            currentDate.add(1, 'days');
        }

        await user.save();
        console.log("Set history seeded successfully");
    } catch (error) {
        console.error("Error seeding set history:", error);
    }
}

// Call the function to seed set history
seedSetHistory();


