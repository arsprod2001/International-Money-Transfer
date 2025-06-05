const express = require('express');
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate'); // Middleware d'authentification
const transactionController = require("../controllers/transactionController")


const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/profile', authenticate, authController.getUserProfile);
router.post('/send-otp', authController.sendOTPToPhone); // Envoyer un OTP
router.post('/verify-otp', authController.verifyOTP); // Vérifier un OTP
router.get('/historique', authenticate, transactionController.getTransactionHistorique);



module.exports = router;