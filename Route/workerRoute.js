const express = require('express');
const { index, single, store, update, remove, fakeData, archives } = require('../Controller/workerController');
const router = express.Router()

const { createWorkerValidator} = require('../validation/workerValidation')


// Service User
router.get('/', index);
router.get('/archives', archives);
router.get('/:_id', single);
router.post('/',createWorkerValidator, store);
router.put('/:_id',createWorkerValidator, update);
router.delete('/:_id', remove);

router.get('/fake/data', fakeData);

module.exports = router