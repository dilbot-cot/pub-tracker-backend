const express = require('express');
const router = express.Router();
const mealTypeController = require('../controllers/mealTypeController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// Public
router.get('/', mealTypeController.getAllMealTypes);

// Admin only
router.post('/', auth, checkRole('admin'), mealTypeController.createMealType);

module.exports = router;
