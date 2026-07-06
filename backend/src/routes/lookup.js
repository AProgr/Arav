const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { list, getByName } = require('../controllers/lookupController');

router.get('/', auth, list);
router.get('/:name', auth, getByName);

module.exports = router;
