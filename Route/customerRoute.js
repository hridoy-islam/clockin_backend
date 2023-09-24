const express = require('express');
const { index, single, store, update, remove, archives, fakeData } = require('../Controller/customerController');
const router = express.Router()
const {customerValidator, customerUpdateValidator} = require('../validation/customerValidation');


// Service User
router.get('/', index);
router.get('/archives', archives);
router.get('/:_id', single);
router.post('/',customerValidator, store);
router.put('/:_id',customerUpdateValidator, update);
router.delete('/:_id', remove);
router.get('/fake/data', fakeData)

module.exports = router