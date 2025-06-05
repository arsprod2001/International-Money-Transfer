const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

const getTransactionHistorique = async (req, res, next) => {
  try {
    const userId = req.userId; 
    const result = await query(
      `SELECT 
    t.id, 
    c.name AS pays_destinataire,
    c.flag_url AS drapeau_pays,
    rp.provider_name AS methode_reception,
    r.full_name AS destinataire,
    r.contact_details,
    u.nom,
    u.prenom,
    t.reference, 
    t.amount_sent || ' ' || t.currency_sent_code AS montant_envoye,
    t.amount_to_receive || ' ' || t.currency_receive_code AS montant_recu,
    t.status,
    TO_CHAR(t.created_at, 'YYYY-MM-DD HH24:MI') AS date_creation,
    TO_CHAR(t.completed_at, 'YYYY-MM-DD HH24:MI') AS date_completion
FROM 
    users u
JOIN 
    sender s ON u.id = s.user_id
JOIN 
    transaction t ON s.id = t.sender_id
JOIN 
    recipient r ON t.id = r.transaction_id
JOIN 
    "RecipientPaymentMethod" rp ON r.payment_method_id = rp.id
JOIN 
    country c ON rp.country_id = c.id
WHERE 
    u.id = $1;`,
      [userId]
    );

    if (!result.rows) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { getTransactionHistorique };

