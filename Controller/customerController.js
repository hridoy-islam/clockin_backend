const {faker} = require('@faker-js/faker')
const Customer = require("../Model/customerModel");
const mongoose = require('mongoose')
// Index - Show All Data.
const index = async (req, res) => {
    try {
        return res.status(200).send({data:await Customer.find({softDelete:false})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data : await Customer.findById({_id:req.params._id})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// Store New 
const store = async (req, res) => { 
    try { 
        return res.status(200).send({ data:await Customer.create(req.body)})
    } 
    catch (error) {  
        return res.status(400).send({ error: error.message}) 
    }
}

// update 
const update = async (req, res) => { 
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateCustomer = await Customer.findByIdAndUpdate(
            _id,
            req.body,
            {new: true}
        )
        return res.status(200).send({ data:updateCustomer})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }
}
// remove 
const remove = async (req, res) => { 
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        console.log(_id);

        const updateCompany = await Customer.findByIdAndUpdate(
            _id,
            {softDelete:true},
            {new: true}
        )
        return res.status(200).send({ data:updateCompany})
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

const fakeData = async(req, res)=> {

    let data = [];

    for (let index = 0; index < 10; index++) {
        const name = faker.person.fullName();
        const location = faker.location.streetAddress({ useFullAddress: true });
        const latitude = faker.location.latitude();
        const longitude = faker.location.longitude();
        const company = faker.string.uuid();

        const generatedData = {
            name,
            location,
            latitude,
            latitude,
            company,
        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}


module.exports = { index, single, store, update, remove, fakeData };