if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const User = require('../model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const auth = catchAsync(async (req, res, next) => {
    if (req.user) {
        return res.status(200).json({ authenticated: true });
    } else {
        return res.status(200).json({ authenticated: false });
    }
});


const profile = catchAsync(async (req, res, next) => {
    res.status(200).json({ message: 'successfull', user: req.user });
})

const updateVisitCount = catchAsync(async (req, res, next) => {

    const incrementVisitCount = async (userId) => {
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return;
        }
        const currentDate = new Date();
        const todayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Get today's date with time set to 00:00:00
        if (user.visitCountModifiedDate < todayDate) {
            // Increment visitCount
            user.visitCount++;

            // Update visitCountModifiedDate to current date
            user.visitCountModifiedDate = todayDate;

            // Save the updated user
            await user.save();
        } 
    }
    incrementVisitCount(req.user.id);
    return res.status(200).json({ message: 'successfull' });
})

const logset = catchAsync(async (req, res, next) => {

    const addSetToExercise = async (userId, muscleGroup, exerciseName, weight, reps) => {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const exercise = user.exercises.find(ex => ex.muscleGroup === muscleGroup);
        const workout = exercise.workouts.find(w => w.exerciseName === exerciseName);

        workout.setsHistory.push({
            date: new Date(),
            weight: weight,
            reps: reps
        });

        await user.save();
    }
    addSetToExercise(req.user.id, req.body.muscleGroup, req.body.exerciseName, req.body.weight, req.body.reps);
    return res.status(200).json({ message: 'successfull' });
})

const firstThreeSets = catchAsync(async (req, res, next) => {

    const firstThreeSets = async (muscleGroup, exerciseName, date, userId) => {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const exercise = user.exercises.find(ex => ex.muscleGroup === muscleGroup);

        if (!exercise) {
            throw new Error('Exercise not found for the specified muscle group');
        }

        const workout = exercise.workouts.find(w => w.exerciseName === exerciseName);

        if (!workout) {
            throw new Error('Workout not found for the specified exercise name');
        }

        const setsHistory = workout.setsHistory.filter(set => {
            // Convert both dates to compare them without time
            const setDate = new Date(set.date).toISOString().split('T')[0];
            const queryDate = new Date(date).toISOString().split('T')[0];
            return setDate === queryDate;
        });

        const firstThreeSets = setsHistory.slice(0, 3);

        return firstThreeSets;
    }
    const { date, exerciseName, muscleGroup } = req.query;
    const setHistory = await firstThreeSets(muscleGroup, exerciseName, date, req.user.id);

    console.log(muscleGroup, exerciseName, date);
    return res.status(200).json({ message: 'successfull', setHistory });
})

const updateCredentials = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    if (await bcrypt.compare(req.body.currentPassword, user.password)) {
        if (req.body.newPassword) {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.newPassword, salt)
            user.password = hashPassword;
            await user.save();
            res.clearCookie('userToken', { httpOnly: true, secure: false });
        }
        else {
            user.email = req.body.newEmail;
            await user.save();
            console.log('email', req.body);
        }
        return res.status(200).json({ message: 'successfull' });
    }
    else {
        return next(new ExpressError('Invalid password ', 401))
    }



})

const updateExercises = catchAsync(async (req, res, next) => {
    let user = req.user;
    const newExercises = req.body;


    // Iterate through the new exercises
    for (const [muscleGroup, exercises] of Object.entries(newExercises)) {
        let muscleGroupExercises = user.exercises.find(e => e.muscleGroup === muscleGroup);

        if (!muscleGroupExercises) {
            // If the muscle group doesn't exist, add it
            muscleGroupExercises = { muscleGroup, workouts: [] };
            user.exercises.push(muscleGroupExercises);
        }

        // Collect existing exercise names
        const existingExerciseNames = muscleGroupExercises.workouts.map(w => w.exerciseName);

        // Add new exercises and update existing ones
        exercises.forEach(exerciseName => {
            if (exerciseName.trim() === '') {
                return; // Skip empty exercise names
            }

            let workout = muscleGroupExercises.workouts.find(w => w.exerciseName === exerciseName);

            if (!workout) {
                // If the workout doesn't exist, add it
                muscleGroupExercises.workouts.push({
                    exerciseName,
                    isActive: true, // or set a default value if needed
                    desiredSets: 0, // or set a default value if needed
                    setsHistory: []
                });
            } else {
                // If the workout exists, you might want to update its details if necessary
                workout.isActive = true; // or some other logic for updating
            }
        });


        muscleGroupExercises.workouts.forEach(workout => {
            if (!exercises.includes(workout.exerciseName)) {
                workout.isActive = false;
            }
        });
    }

    await user.save();

    return res.status(200).json({ message: 'successfull' });
})

const update = catchAsync(async (req, res, next) => {
    const updateData = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        sex: req.body.sex,
        weight: req.body.weight,
        ft: req.body.ft,
        in: req.body.in,
        dob: req.body.dob
    };
    if (updateData.weight) {
        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().split('T')[0];

        const user = req.user;

        let weightHistoryEntry = user.weightHistory.find(entry =>
            entry.date.toISOString().split('T')[0] === currentDateString
        );

        if (weightHistoryEntry) {
            weightHistoryEntry.weight = updateData.weight;
        } else {
            // Push a new weight history entry
            user.weightHistory.push({ date: currentDate, weight: updateData.weight });
        }

        delete updateData.weight;

        Object.assign(user, updateData);
        const updatedUser = await user.save();
        return res.status(200).json({ message: 'successfull', user: updatedUser });
    }
    else {
        const updatedUser = await User.findByIdAndUpdate(updateData.id, updateData, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators
        });

        return res.status(200).json({ message: 'successfull', user: updatedUser });
    }
})

const login = catchAsync(async (req, res, next) => {

    const { email, password, } = req.body;
    const userExists = await User.findOne({ email });


    if (userExists && (await bcrypt.compare(password, userExists.password))) {
        res.cookie("userToken", generateToken(userExists.id), {
            httpOnly: true,
        });

        return res.status(200).json({
            message: 'Logged in Successfully.'
        });
    } else {
        return next(new ExpressError('Invalid email or password ', 401))
    }


})

const logout = (req, res) => {
    res.clearCookie('userToken', { httpOnly: true, secure: false });
    res.status(200).json({ message: 'Logged out successfully' });
}

const register = catchAsync(async (req, res, next) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(401).json({ message: "User existsadsa" });
    }

    const { weight, password, ...newreqbody } = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const userData = new User({
        ...newreqbody,
        password: hashPassword,
        weightHistory: [{
            date: new Date(),
            weight
        }],
        exercises: [
            {
                muscleGroup: "chest",
                workouts: [
                    { exerciseName: "Flat Bench Press", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Incline Bench Press", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Butterfly Machine", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "triceps",
                workouts: [
                    { exerciseName: "Overhead Extension", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Cable Pushdowns", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Dips", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "shoulders",
                workouts: [
                    { exerciseName: "Lateral Raises", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Face Pull", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "back",
                workouts: [
                    { exerciseName: "Lat Pulldowns", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Row", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Pull-ups", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "biceps",
                workouts: [
                    { exerciseName: "Incline Dumbbell Curls", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Behind the Body Cable Curls", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Preacher Curl", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            { muscleGroup: "forearm", workouts: [] },
            { muscleGroup: "core", workouts: [] },
            {
                muscleGroup: "quadriceps",
                workouts: [
                    { exerciseName: "Hack Squats", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Leg Extension", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Barbell Squats", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "hamstrings",
                workouts: [
                    { exerciseName: "Seated Leg Curl", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Lying Leg Curls", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Stiff Legged Deadlift", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "glutes",
                workouts: [
                    { exerciseName: "Front Foot Elevated Lunges", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Hip Thrust", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Seated Hip Adduction (Outer Thigh)", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            },
            {
                muscleGroup: "calves",
                workouts: [
                    { exerciseName: "Straight Leg Calf Exercises", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Seated Calf Raises", isActive: true, desiredSets: 3, setsHistory: [] },
                    { exerciseName: "Calf Press", isActive: true, desiredSets: 3, setsHistory: [] }
                ]
            }
        ]
    });
    await userData.save();
    res.cookie("userToken", generateToken(userData.id), {
        httpOnly: true,
    });
    return res.status(201).json({ message: "User registered successfully" });
});


module.exports = {
    register,
    login,
    logout,
    auth,
    profile,
    update,
    updateExercises,
    updateCredentials,
    firstThreeSets,
    logset,
    updateVisitCount,
};