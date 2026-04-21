const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const auth = require('../middleware/auth');

router.get('/', contentController.getContent);
router.put('/:section', auth, contentController.updateSection);

module.exports = router;
