const express = require('express');
const { index, single, store, update, remove, archives, fakeData } = require('../Controller/companyController');
const router = express.Router()
const { companyValidator } = require('../validation/companyValidation')
const { isAuthenticated } = require('../Config/helper');

// Service User
router.get('/', isAuthenticated, index);
router.get('/:_id', isAuthenticated, single);
router.post('/', companyValidator, isAuthenticated, store);
router.patch('/:_id', isAuthenticated, update);
router.delete('/:_id', isAuthenticated, remove);

router.get('/fake/data', fakeData);

module.exports = router