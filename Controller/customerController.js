const Customer = require("../Model/customerModel");
const mongoose = require('mongoose')
const { CustomerPagination } = require('../common/function');
// Index - Show All Data.
const index = async (req, res) => {
    const { limit, page, sort_by, ...restReqQuery } = req.query;

    try {
        const query = restReqQuery
        const data = await CustomerPagination({ query, reqQuery: req.query });
        return res.status(200).send({ data });

        // return res.status(200).send({data:await Customer.find({softDelete:false})});
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data: await Customer.findById({ _id: req.params._id }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// Store New 
const store = async (req, res) => {
    try {
        const customer = await Customer.findOne({ phone: req.body.phone });
        if (customer) return res.status(409).send({ message: 'Customer already exists' })
        return res.status(200).send({ data: await Customer.create(req.body) })
    }
    catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

// update 
const update = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateCustomer = await Customer.findByIdAndUpdate(
            _id,
            req.body,
            { new: true }
        )
        return res.status(200).send({ data: updateCustomer })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}
// remove 
const remove = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateCompany = await Customer.findByIdAndUpdate(
            _id,
            { softDelete: true },
            { new: true }
        )
        return res.status(200).send({ data: updateCompany })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

const archives = async (req, res) => {

    try {
        return res.status(200).send({ data: await Customer.find({ softDelete: true }) });
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}




module.exports = { index, single, store, update, remove, archives };