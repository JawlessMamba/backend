const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');
const { authenticate, requireAdmin } = require('../middleware/authenticate');

router.use(authenticate);

router.get('/:category', categoryController.getCategories);
// Only admins manage categories (matches the Categories page UI)
router.post('/:category', requireAdmin, categoryController.addCategory);
router.delete('/:category/:id', requireAdmin, categoryController.deleteCategory);

module.exports = router;
