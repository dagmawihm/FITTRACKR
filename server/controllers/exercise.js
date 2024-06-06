const Exercise = require('../model/exercise');
const catchAsync = require('../utils/catchAsync');

const exercises = catchAsync(async (req, res) => {
    const exercises = await Exercise.find();
    return res.status(200).json({ message: 'successfull', exercises: exercises });
})

module.exports = {exercises};
