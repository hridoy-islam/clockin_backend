const express = require('express');
const { index, single, store, update, remove } = require('../Controller/companyController');
const router = express.Router()


// Service User
router.get('/', index);
router.get('/:id', single);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router