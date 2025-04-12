const express = require('express');
const router = express.Router();
const pubController = require('../controllers/pubController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// Public
router.get('/', pubController.getAllPubs);
router.get('/:id', pubController.getPubById);

// Authenticated
router.post('/', auth, pubController.createPub);
router.put('/:id', auth, pubController.updateOwnPub);
router.delete('/:id', auth, pubController.deleteOwnPub);

// Specials
router.post('/:id/specials', auth, pubController.addSpecialToPub);
router.delete('/:id/specials/:specialId', auth, pubController.removeSpecialFromPub);

// Admin override
router.put('/:id/admin', auth, checkRole('admin'), pubController.adminUpdatePub);
router.delete('/:id/admin', auth, checkRole('admin'), pubController.adminDeletePub);

module.exports = router;
