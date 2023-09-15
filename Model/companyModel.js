const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    Address: String,
    contactName: String,
    contactPhone: String,
    verified: Boolean,
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

module.exports = Company;