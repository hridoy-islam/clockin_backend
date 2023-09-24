const express = require('express');
const { index, single, store, remove, fakeData , update, start, end, comment} = require('../Controller/serviceController');
const router = express.Router()
const {createServiceValidator, commentValidator} = require('../validation/serviceValidation')

// Service User
router.get('/', index);
router.get('/:_id', single);
router.post('/',createServiceValidator, store);
router.put('/:_id',createServiceValidator, update);
router.patch('/start/:_id', start);
router.patch('/end/:_id', end);
router.patch('/comment/:_id',commentValidator, comment);
router.delete('/:_id', remove);


router.get('/fake/data', fakeData)

module.exports = router