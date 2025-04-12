const express = require('express');
const router = express.Router();
const pubController = require('../controllers/pubController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');

// Public
router.get('/', pubController.getAllPubs);
router.get('/:id', pubController.getPubById);

// Authenticated: Specials (any user can add/edit/delete)
router.post('/:id/specials', auth, pubController.addSpecialToPub);
router.delete('/:id/specials/:specialId', auth, pubController.removeSpecialFromPub);

// Authenticated: Pubs (admin-only)
router.post('/', auth, checkRole('admin'), pubController.createPub);
router.put('/:id', auth, checkRole('admin'), pubController.adminUpdatePub);
router.delete('/:id', auth, checkRole('admin'), pubController.adminDeletePub);

module.exports = router;