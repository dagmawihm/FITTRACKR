const express = require('express');
const router = express.Router();
const exercise = require('../controllers/exercise')
const verifyJWT = require('../middleware/verifyJWT');

router.get('/exercises', verifyJWT, exercise.exercises);

module.exports = router;