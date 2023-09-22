const mongoose = require('mongoose')
const { Schema } = mongoose

const CompanySchema = new Schema({
    name: { type: String, required: true},
    email:{ type: String, required: true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    address: { type: String},
    contactName: { type: String},
    contactPhone: { type: String},
    verified: { type: Boolean, default:false},
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      },
    strict: true,
})


const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;