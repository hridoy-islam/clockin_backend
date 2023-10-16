const express = require('express');
const { index, single, store, update } = require('../Controller/payDayController');
const router = express.Router()
const { isAuthenticated } = require('../Config/helper');
// Service User
router.get('/', isAuthenticated, index);
router.get('/:_id', isAuthenticated, single);
router.post('/', isAuthenticated, store);
router.patch('/:_id', isAuthenticated, update);

module.exports = router