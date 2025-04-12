const express = require('express');
const router = express.Router();
const specialsController = require('../controllers/specialsController');

// Public - grouped specials by day
router.get('/by-day', specialsController.getSpecialsByDay);

module.exports = router;