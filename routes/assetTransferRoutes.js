const express = require('express');
const router = express.Router();

// Controller import
const assetTransferController = require('../controllers/assetTransferController');
// Import the authentication middleware
const { authenticate } = require('../middleware/authenticate');

// Every transfer route requires a logged-in user
router.use(authenticate);

// Create a new asset transfer (user info comes from the token)
router.post('/create-transfer-asset', assetTransferController.createTransfer);

// Get all transfers with pagination & search
router.get('/get-all-transfer-assets', assetTransferController.getAllTransfers);

// Get transfer history for a specific asset (with pagination)
router.get('/asset-history/:asset_id', assetTransferController.getAssetTransferHistory);

// Get specific transfer details by ID
router.get('/transfer/:transfer_id', assetTransferController.getTransferById);

module.exports = router;
