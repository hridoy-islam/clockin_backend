const { faker } = require('@faker-js/faker');
const Service = require("../Model/serviceModel");
const mongoose = require('mongoose')
const { ServicePagination } = require('../common/function');

// Index - Show All Data.
const index = async (req, res) => {
    const { limit, page, sort_by, ...restReqQuery } = req.query;

    try {
        const query = restReqQuery
        const data = await ServicePagination({ query, reqQuery: req.query });
        return res.status(200).send({ data });

        // return res.status(200).send({ data: await Service.find({ softDelete: false }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data: await Service.findById({ _id: req.params._id }).populate('customer').populate('worker') });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// Store New 
const store = async (req, res) => {
    try {
        return res.status(200).send({ data: await Service.create(req.body) })
    }
    catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// update 

const update = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        return res.status(200).send({ data: updateService })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

function currrentTime() {
    const date = new Date();
    return date.getHours() + ":" + ("00" + date.getMinutes()).slice(-2);
}

function getTimeInMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

const start = async (req, res) => {
    try {

        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            { workerLogin: Date.now() },
            { new: true }
        )
        return res.status(200).send({ data: updateService })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const end = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const serivce = await Service.findById({ _id });

        // calculate total duration
        // const loginMinutes = getTimeInMinutes(serivce.workerLogin);
        // let logoutMinutes = getTimeInMinutes(currrentTime());
        // if (logoutMinutes < loginMinutes) logoutMinutes = getTimeInMinutes("24:00");
        // const totalWorkTimeMinutes = logoutMinutes - loginMinutes;
        const logOutTime = Date.now();
        const updateService = await Service.findByIdAndUpdate(
            _id,
            { workerLogout: logOutTime, duration: logOutTime - (serivce.workerLogin) },
            { new: true }
        )
        return res.status(200).send({ data: updateService })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const comment = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        return res.status(200).send({ data: updateService })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}
// remove 
const remove = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateService = await Service.findByIdAndUpdate(
            _id,
            { softDelete: true },
            { new: true }
        )
        return res.status(200).send({ data: updateService })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const statusUpdate = async (req, res) => {
    try {
        const updateTaskList = await Service.updateOne(
            { _id: req.params._id, "taskList._id": req.params.task_id },
            { $set: { "taskList.$.status": req.body.status } }
        )
        if (updateTaskList) {
            const updatedService = await Service.findOne({ _id: req.params._id });
            return res.status(200).send({ data: updatedService })
        } else throw Error('Task update failed')

    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

module.exports = { index, single, store, remove, update, start, end, comment, statusUpdate };