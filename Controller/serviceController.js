const { faker } = require('@faker-js/faker');
const Service = require("../Model/serviceModel");
const mongoose = require('mongoose')

// Index - Show All Data.
const index = async (req, res) => {
    try {
        return res.status(200).send({data:await Service.find({softDelete:false})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data : await Service.findById({_id:req.params._id})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// Store New 
const store = async (req, res) => { 
    try { 
        return res.status(200).send({ data:await Service.create(req.body)})
    } 
    catch (error) {  
        return res.status(400).send({ error: error.message}) 
    }
}

// update 

const update = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            req.body,
            {new: true}
        )
        return res.status(200).send({ data:updateService})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }
}

function currrentTime() {
    const date = new Date();
    return date.getHours() + ":" + ("00" + date.getMinutes()).slice(-2);
}
const start = async (req, res) => {
    try {
        
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            {workerLogin: currrentTime() },
            {new: true}
        )
        return res.status(200).send({ data:updateService})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }
}

const end = async (req, res) => { 
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            {workerLogout: currrentTime()},
            {new: true}
        )
        return res.status(200).send({ data:updateService})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }
}

const comment = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            req.body,
            {new: true}
        )
        return res.status(200).send({ data:updateService})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }
}
// remove 
const remove = async (req, res) => { 
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            {softDelete:true},
            {new: true}
        )
        return res.status(200).send({ data:updateService})
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

const fakeData = async (req, res) => {

    let data = [];

    for (let index = 0; index < 10; index++) {
        const serviceDate = faker.date.future();
        const serviceTimeStart = faker.date.future();
        const serviceTimeEnd = faker.date.future();
        const status = 'pendiing';
        const customer = faker.string.uuid();
        const company = faker.string.uuid();
        const workerLogin = faker.date.future();
        const workerLogout = faker.date.future();
        const comment = faker.lorem.text();

        const taskList = [];

        for (let index = 0; index < 5; index++) {
            const taskName = faker.person.fullName();
            const status = 'pending';
            const company = faker.string.uuid();

            const taskListData = {
                taskName,
                status,
                company,
            }

            taskList.push(taskListData)
        }




        const generatedData = {
            serviceDate,
            serviceTimeStart,
            serviceTimeEnd,
            status,
            customer,
            company,
            workerLogin,
            workerLogout,
            comment,
            taskList,

        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}

module.exports = { index, single, store, remove, fakeData , update, start, end, comment};