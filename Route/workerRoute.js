const express = require('express');
const { index, single, store, update, remove, archives, uploadFile } = require('../Controller/workerController');
const router = express.Router()
const { createWorkerValidator } = require('../validation/workerValidation')
const { isAuthenticated } = require('../Config/helper');

const upload = require('../common/fileUploadMiddleware');

// Service User
router.get('/', index);
router.get('/archives', archives);
router.get('/:_id', single);
router.post('/', createWorkerValidator, store);
router.patch('/image/:_id', upload.single('profile'), uploadFile);
router.patch('/:_id', update);
router.delete('/:_id', remove);

module.exports = router