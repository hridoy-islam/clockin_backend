const { faker } = require('@faker-js/faker')
const Worker = require("../Model/workerModel");
const mongoose = require('mongoose')
const { WorkerPagination } = require('../common/function');

// Index - Show All Data.
const index = async (req, res) => {
    const { limit, page, sort_by, ...restReqQuery } = req.query;

    try {
        const query = restReqQuery
        const data = await WorkerPagination({ query, reqQuery: req.query });
        return res.status(200).send({ data });

        // return res.status(200).send({data:await Worker.find({softDelete:false})});
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data: await Worker.findById({ _id: req.params._id }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// Store New 
const store = async (req, res) => {
    try {
        // req.body.company = req.auth._id;
        const worker = await Worker.findOne({ phone: req.body.phone });
        if (worker) return res.status(409).send({ message: 'Team mate already exists' })
        return res.status(200).send({ data: await Worker.create(req.body) })
    }
    catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const uploadFile = async (req, res) => {

    try {
        if (!req.file) {
            console.log("No file received");
            return res.send({
              success: false
            });
        
          } else {
            const _id = new mongoose.Types.ObjectId(req.params._id);
            // const imageUrl = req.protocol + '://' + req.get('host')

            const updateWorker = await Worker.findByIdAndUpdate(
                _id,
                {imagePath:`profile/${req.file.filename}` },
                { new: true }
            )

            return res.status(200).send({ data: updateWorker })
          }

    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// update 
const update = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateWorker = await Worker.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        return res.status(200).send({ data: updateWorker })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}
// remove 
const remove = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateWorker = await Worker.findByIdAndUpdate(
            _id,
            { softDelete: true },
            { new: true }
        )
        return res.status(200).send({ data: updateWorker })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const archives = async (req, res) => {
    try {
        return res.status(200).send({ data: await Worker.find({ softDelete: true }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}


const fakeData = async (req, res) => {

    let data = [];

    for (let index = 0; index < 10; index++) {
        const name = faker.person.fullName();
        const phone = faker.phone.number();
        const password = faker.internet.password();
        const company = faker.string.uuid();
        const holidays = faker.helpers.rangeToNumber({ min: 20, max: 30 })
        const verified = faker.datatype.boolean();

        const generatedData = {
            name,
            phone,
            password,
            company,
            holidays,
            verified
        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}

module.exports = { index, single, store, update, remove, fakeData, archives , uploadFile};