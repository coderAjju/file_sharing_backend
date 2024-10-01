const express = require('express');
const signupController = require('../controllers/signupController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');

const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router