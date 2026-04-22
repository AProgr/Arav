const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, getById, create, update, deactivate, search } = require('../controllers/civilController');

router.get('/search', auth, search);
router.get('/', auth, getAll);
router.get('/:id', auth, getById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.patch('/:id/deactivate', auth, deactivate);

module.exports = router;
