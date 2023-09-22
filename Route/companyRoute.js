const express = require('express');
const { index, single, store, update, remove, fakeData } = require('../Controller/companyController');
const router = express.Router()
const companyValidator = require('../validation/companyValidation')

// Service User
router.get('/', index);
router.get('/:_id', single);
router.post('/',companyValidator, store);
router.put('/:_id', update);
router.delete('/:_id', remove);

router.get('/fake/data', fakeData);

module.exports = router