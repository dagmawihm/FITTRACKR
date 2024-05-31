if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}


const User = require('../model/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const catchAsync = require('../utils/catchAsync');
const ExpressError =  require('../utils/ExpressError')

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const auth = catchAsync(async (req, res, next) => {
    if (req.user) {
        res.status(200).json({ authenticated: true });
    } else {
        res.status(200).json({ authenticated: false });
    }
});


const profile = catchAsync(async (req, res, next) => {
    res.status(200).json({ message: 'successfull', user: req.user });
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
          res.status(200).json({ message: 'successfull', user: updatedUser});
        }
        else
        {
            const updatedUser = await User.findByIdAndUpdate(updateData.id, updateData, {
                new: true, // Return the updated document
                runValidators: true // Run schema validators
              });

              res.status(200).json({ message: 'successfull', user: updatedUser});
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
};