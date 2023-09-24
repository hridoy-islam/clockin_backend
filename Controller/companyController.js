const { faker } = require('@faker-js/faker');
const Company = require("../Model/companyModel");
const mongoose = require('mongoose')

// Index - Show All Data.
const index = async (req, res) => {

    try {
        return res.status(200).send({data:await Company.find({softDelete:false})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data : await Company.findById({_id:req.params._id})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// Store New 
const store = async (req, res) => {
    try { 
        const company = await Company.findOne({ 
            $or: [
            { email:req.body.email }, 
            { phone: req.body.phone }
        ] 
    });

        if(company) return res.status(409).send({ message:'Company already exists'})
        return res.status(200).send({ data:await Company.create(req.body)})
    } 
    catch (error) {  
        return res.status(400).send({ error: error.message}) 
    }
}

// update 
const update = async (req, res) => {

    try {
        const company = await Company.findOne({ $or: [
            { email:req.body.email }, 
            { phone: req.body.phone }
        ] });

        if(company._id.toString() !== req.params._id ) return res.status(409).send({ message:'Company already exists'});
    
        const updateCompany = await Company.findByIdAndUpdate(
            company._id,
            req.body,
            {new: true}
        )
        return res.status(200).send({ data:updateCompany})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }

};

// remove 
const remove = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateCompany = await Company.findByIdAndUpdate(
            _id,
            {softDelete:true},
            {new: true}
        )
        return res.status(200).send({ data:updateCompany})
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
 }

const fakeData = async (req, res) => {
    let data = [];
    for (let index = 0; index < 10; index++) {
        const companyName = faker.company.name();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const address = faker.location.streetAddress({ useFullAddress: true });
        const phone = faker.phone.number();
        const contactName = faker.internet.displayName();
        const contactPhone = faker.phone.number();
        const verified = faker.datatype.boolean();
        const generatedData = {
            companyName,
            email,
            password,
            address,
            phone,
            contactName,
            contactPhone,
            verified,
        }
        data.push(generatedData)
    }
    res.json({
        data,
    })
}

module.exports = { index, single, store, update, remove, fakeData };