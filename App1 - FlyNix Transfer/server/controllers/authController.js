const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { authValidators } = require('../validators/authValidators');
const { query } = require('../config/db');
const { sendOTP } = require('../services/twilioService');
const { generateOTP } = require('../utils/otpGenerator');

const otpStore = {}; // Stocke les OTP temporairement

const sendOTPToPhone = async (req, res, next) => {
  const {phone}  = req.body;
 
  if (!phone) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  // Vérifie si le numéro de téléphone existe dans la base de données
  const user = await User.findByPhoneNumber(phone);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Phone number not found' });
  }

  const otp = generateOTP();
  otpStore[phone] = otp; // Stocke l'OTP


  const isSent = await sendOTP(phone, otp);

  if (!isSent) {
    return res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }

  res.json({ success: true, message: 'OTP sent successfully' });
};

const verifyOTP = async (req, res, next) => {
  const { phone, otp } = req.body;
  console.log(phone, otp)


  if (!phone || !otp) {
    return res.status(400).json({ success: false, error: 'Phone number and OTP are required' });
  }

  // Vérifie si le numéro de téléphone existe dans la base de données
  const user = await User.findByPhoneNumber(phone);
  if (!user) {
    return res.status(404).json({ success: false, error: 'Phone number not found' });
  }

  
  if (otpStore[phone] === otp) {
    delete otpStore[phone]; // Supprime l'OTP après vérification

    
    // Génère un token JWT pour l'utilisateur
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log("reussi");

    res.json({ success: true, message: 'OTP verified successfully', token });
  } else {
    res.status(401).json({ success: false, error: 'Invalid OTP' });
  }
};



const signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { prenom,nom,email,phone,birthday,password } = req.body;
    console.log(prenom, phone)
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create(prenom,nom,email,phone,birthday,hashedPassword);

    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        prenom : user.prenom,
        nom : user.nom,
        email : user.email,
        phone:user.phone,
        birthday:user.birthday,
        hashedPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      data: {
        token,
        expiresIn: 3600
      }
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.userId; // Récupéré à partir du middleware d'authentification
    const result = await query(
      `SELECT prenom, nom, birthday, email, phone, profil_url 
       FROM users 
       WHERE id = $1`,
      [userId]
    );

    if (!result.rows[0]) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { signUp, signIn, getUserProfile, sendOTPToPhone, verifyOTP };

