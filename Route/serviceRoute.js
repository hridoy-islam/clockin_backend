const express = require('express');
const { index, single, store, remove, fakeData, update, start, end, comment } = require('../Controller/serviceController');
const router = express.Router()
const { createServiceValidator, commentValidator } = require('../validation/serviceValidation')
const { isAuthenticated } = require('../Config/helper');

// Service User
router.get('/', isAuthenticated, index);
router.get('/:_id', isAuthenticated, single);
router.post('/', createServiceValidator, isAuthenticated, store);
router.patch('/:_id', createServiceValidator, isAuthenticated, update);
router.patch('/start/:_id', isAuthenticated, start);
router.patch('/end/:_id', isAuthenticated, end);
router.patch('/comment/:_id', commentValidator, isAuthenticated, comment);
router.delete('/:_id', isAuthenticated, remove);


router.get('/fake/data', fakeData)

module.exports = router