const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate'); 


const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/profile', authenticate, authController.getUserProfile);
router.post('/send-otp', authController.sendOTPToPhone); 
router.post('/verify-otp', authController.verifyOTP); 


module.exports = router;