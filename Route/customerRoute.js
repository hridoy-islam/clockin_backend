const express = require('express');
const { index, single, store, update, remove, archives, fakeData } = require('../Controller/customerController');
const router = express.Router()
const { customerValidator, customerUpdateValidator } = require('../validation/customerValidation');
const { isAuthenticated } = require('../Config/helper');

// Service User
router.get('/', isAuthenticated, index);
router.get('/:_id', isAuthenticated, single);
router.post('/', customerValidator, isAuthenticated, store);
router.put('/:_id', customerUpdateValidator, isAuthenticated, update);
router.delete('/:_id', isAuthenticated, remove);
router.get('/fake/data', fakeData)

module.exports = router