const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Génère un code à 6 chiffres
  };
  
  module.exports = { generateOTP };