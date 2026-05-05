const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/sync-payment', userController.syncPayment);
router.post('/check-auth', userController.checkAuth);

module.exports = router;