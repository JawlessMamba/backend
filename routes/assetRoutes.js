const express = require("express");
const router = express.Router();
const { authenticate, requireAdmin } = require("../middleware/authenticate");

const {
  createAsset,
  getAllAssets,
  deleteAsset,
  markAssetSurplus,
  updateAsset,
  getAssetDropdownOptions,
  exportAssets,
  autoUpdateAssetStatus,
  getFilterOptions,
  checkAndUpdateExpiringAssets
} = require("../controllers/assetController");

// Every asset route requires a logged-in user
router.use(authenticate);

router.post("/check-expiring", checkAndUpdateExpiringAssets);
router.get("/filter-options", getFilterOptions);
router.post("/createAsset", createAsset);
router.get("/getAllAssets", getAllAssets);
router.get("/export", exportAssets);
router.delete('/deleteAsset/:id', requireAdmin, deleteAsset);
router.put('/assets/:id/surplus', markAssetSurplus);
router.put('/assets/:id', updateAsset);
router.get("/dropdown-options", getAssetDropdownOptions);

router.post("/auto-update-status", autoUpdateAssetStatus);

module.exports = router;
