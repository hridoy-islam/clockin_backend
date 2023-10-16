const PayDayModel = require("../Model/payDayModel");
const mongoose = require('mongoose')
const { PayDayPagination } = require('../common/function');

// Index - Show All Data.
const index = async (req, res) => {
    const { limit, page, sort_by, ...restReqQuery } = req.query;

    try {
        const query = restReqQuery
        const data = await PayDayPagination({ query, reqQuery: req.query });
        return res.status(200).send({ data });

        // return res.status(200).send({ data: await Service.find({ softDelete: false }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data: await PayDayModel.findById({ _id: req.params._id }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// Store New 
const store = async (req, res) => {
    try {
        const company = await PayDayModel.findOne({ company: req.body.company });
        if (company) return res.status(409).send({ message: 'Company pay day already exists' })
        return res.status(200).send({ data: await PayDayModel.create(req.body) })
    }
    catch (error) {
        return res.status(400).send({ error: error.message })
    }
}


// update 
const update = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updatePayDay = await PayDayModel.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        return res.status(200).send({ data: updatePayDay })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}


module.exports = { index, single, store, update };