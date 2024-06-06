const express = require('express');
const router = express.Router();
const users = require('../controllers/user')
const verifyJWT = require('../middleware/verifyJWT');


router.post('/login', users.login);

router.post('/logout', users.logout);

router.post('/register', users.register);

router.post('/auth', verifyJWT, users.auth);

router.get('/profile', verifyJWT, users.profile);

router.get('/firstthreesets', verifyJWT, users.firstThreeSets);

router.post('/logset', verifyJWT, users.logset);

router.post('/updatevisitcount', verifyJWT, users.updateVisitCount);

router.post('/update', verifyJWT, users.update);

router.post('/update/exercises', verifyJWT, users.updateExercises);

router.post('/update/credentials', verifyJWT, users.updateCredentials);


module.exports = router;





