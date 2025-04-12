const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   POST /api/auth/login
// @desc    Login and get token
// @access  Public
router.post('/login', authController.login);

// @route   DELETE /api/auth/delete
// @desc    Delete own account
// @access  Private
router.delete('/delete', auth, authController.deleteAccount);

module.exports = router;