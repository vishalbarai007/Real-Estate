const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');

router.get('/', projectController.getAll);
router.get('/:slug', projectController.getBySlug);
router.post('/', auth, projectController.create);
router.put('/:slug', auth, projectController.update);
router.delete('/:slug', auth, projectController.remove);

module.exports = router;
