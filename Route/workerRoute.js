const express = require('express');
const { index, single, store, update, remove, fakeData, archives } = require('../Controller/workerController');
const router = express.Router()
const { createWorkerValidator } = require('../validation/workerValidation')
const { isAuthenticated } = require('../Config/helper');

// Service User
router.get('/', isAuthenticated, index);
router.get('/archives', isAuthenticated, archives);
router.get('/:_id', isAuthenticated, single);
router.post('/', createWorkerValidator, isAuthenticated, store);
router.patch('/:_id', isAuthenticated, update);
router.delete('/:_id', isAuthenticated, remove);

router.get('/fake/data', fakeData);

module.exports = router