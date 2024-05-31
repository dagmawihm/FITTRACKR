const express = require('express');
const router = express.Router();
const users = require('../controllers/user')
const verifyJWT = require('../middleware/verifyJWT');


router.post('/login', users.login);

router.post('/logout', users.logout);

router.post('/register', users.register);

router.post('/auth', verifyJWT, users.auth);

router.get('/profile', verifyJWT, users.profile);

router.post('/update', verifyJWT, users.update);


module.exports = router;





