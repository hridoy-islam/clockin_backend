const express = require('express');
const { index, single, store, update, remove, fakeData } = require('../Controller/serviceController');
const router = express.Router()


// Service User
router.get('/', index);
router.get('/:id', single);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', remove);


router.get('/fake/data', fakeData)

module.exports = router