const express = require('express');
const { index, single, store, update, remove, fakeData, archives } = require('../Controller/taskListController');
const router = express.Router()
const { createTaskListValidator, updateTaskListValidator } = require('../validation/taskListValidation')
const { isAuthenticated } = require('../Config/helper');

// Service User
router.get('/', isAuthenticated, index);
router.get('/:_id', isAuthenticated, single);
router.post('/', createTaskListValidator, isAuthenticated, store);
router.put('/:_id', updateTaskListValidator, isAuthenticated, update);
router.delete('/:_id', isAuthenticated, remove);

router.get('/fake/data', fakeData)

module.exports = router