const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');


const pendingTransactions = new Map();

const validatePayment = (amount) => {
  const amountNum = Number(amount);
  if (isNaN(amountNum)) return { valid: false, error: 'Montant invalide' };
  if (amountNum < 0.5) return { valid: false, error: 'Minimum 0.50€' };
  return { valid: true, amount: amountNum };
};



/** 
router.post('/:id/cancel', async (req, res) => {
  try {
    const paymentId = req.params.id;
    const transaction = pendingTransactions.get(paymentId);

    if (!transaction) {
      console.log(`Transaction non trouvée: ${paymentId}`);
      return res.status(404).json({ 
        error: 'Transaction non trouvée',
        details: `ID: ${paymentId}`
      });
    }

    // Annulation dans Stripe
    const canceledIntent = await stripe.paymentIntents.cancel(paymentId);
    
    // Suppression du stockage local
    pendingTransactions.delete(paymentId);

    console.log(`Transaction annulée: ${paymentId}`);
    res.json({ 
      status: 'canceled',
      amount: canceledIntent.amount,
      currency: canceledIntent.currency,
      id: canceledIntent.id
    });

  } catch (err) {
    console.error(`Erreur d'annulation: ${err.message}`);
    res.status(500).json({ 
      error: 'Échec de l\'annulation',
      stripe_error: err.type || err.code,
      message: err.message
    });
  }
});

*/


// Création de payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const validation = validatePayment(amount);
    
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validation.amount * 100),
      currency: 'eur',
      capture_method: 'manual',
      metadata: {
        simulation: true,
        created_at: new Date().toISOString()
      }
    });

    pendingTransactions.set(paymentIntent.id, {
      intent: paymentIntent,
      expires_at: Date.now() + 180000 
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id
    });

  } catch (err) {
    console.error('Stripe Error:', err);
    res.status(500).json({ 
      error: 'Payment processing failed',
      details: err.message 
    });
  }
});


/**
// Récupération des transactions
router.get('/transactions', (req, res) => {
  try {
    const transactions = Array.from(pendingTransactions.values()).map(t => ({
      id: t.intent.id,
      amount: t.intent.amount,
      status: t.intent.status,
      expires_at: t.expires_at
    }));
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

 */


/** 

// Capture simplifiée
router.post('/:id/capture', async (req, res) => {
  try {
    const paymentId = req.params.id;
    await stripe.paymentIntents.capture(paymentId);
    pendingTransactions.delete(paymentId);
    res.json({ status: 'captured' });
  } catch (err) {
    res.status(400).json({ error: 'Capture failed' });
  }
});

*/

/** 
// Nettoyage automatique
setInterval(() => {
  const now = Date.now();
  for (const [id, transaction] of pendingTransactions.entries()) {
    if (transaction.expires_at <= now) {
      stripe.paymentIntents.cancel(id).catch(console.error);
      pendingTransactions.delete(id);
    }
  }
}, 60000);
*/

module.exports = router;