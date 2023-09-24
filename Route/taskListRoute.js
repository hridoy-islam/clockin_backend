const express = require('express');
const { index, single, store, update, remove, fakeData, archives } = require('../Controller/taskListController');
const router = express.Router()
const {createTaskListValidator, updateTaskListValidator} = require('../validation/taskListValidation')


// Service User
router.get('/', index);
router.get('/archives', archives);
router.get('/:_id', single);
router.post('/',createTaskListValidator, store);
router.put('/:_id',updateTaskListValidator, update);
router.delete('/:_id', remove);

router.get('/fake/data', fakeData)

module.exports = router