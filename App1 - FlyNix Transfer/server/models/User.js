const { query } = require('../config/db');

const User = {
  create: async (prenom,nom,email,phone,birthday,password) => {
    try {
      const result = await query(
        `INSERT INTO users (prenom,nom,email,phone,birthday,password, role) 
         VALUES ($1, $2, $3, $4, $5, $6, 'sender') 
         RETURNING id, prenom,nom,email,phone,birthday,password, created_at`,
        [prenom,nom,email,phone,birthday,password]
      );
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { 
        throw new Error('Email already exists');
      }
      throw error;
    }
  },

  findByEmail: async (email) => {
    const result = await query(
      `SELECT id, email, password 
       FROM users 
       WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  },

  findByPhoneNumber: async (telephone) => {

  try {
    const result = await query(
      `SELECT id, email, phone 
       FROM users 
       WHERE phone = $1`,
      [telephone]
    );

    console.log('Query result:', result.rows); 
    return result.rows[0];
  } catch (error) {
    console.error('Error in findByPhoneNumber:', error); 
    throw error;
  }
},



};

module.exports = User;



