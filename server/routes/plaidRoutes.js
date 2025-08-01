const express = require('express');
const router = express.Router();
const plaidController = require('../controllers/plaidController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/create_link_token', plaidController.createLinkToken);
router.post('/exchange_public_token', plaidController.exchangePublicToken);
router.post('/sync-transactions', authMiddleware, plaidController.syncTransactions);

module.exports=router;