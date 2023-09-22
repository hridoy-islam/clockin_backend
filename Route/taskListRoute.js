const express = require('express');
const { index, single, store, update, remove, fakeData, archiveList } = require('../Controller/taskListController');
const router = express.Router()
const {createTaskListValidator, updateTaskListValidator} = require('../validation/taskList')


// Service User
router.get('/', index);
router.get('/archivelist', archiveList);
router.get('/:_id', single);
router.post('/',createTaskListValidator, store);
router.put('/:_id',updateTaskListValidator, update);
router.delete('/:_id', remove);

router.get('/fake/data', fakeData)

module.exports = router