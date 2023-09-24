const mongoose = require('mongoose')
const { Schema } = mongoose
const CompanySchema = new Schema({
    name: { type: String, required: true},
    email:{ type: String, required: true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    role:{
        type: String,
        enum: ["admin", "company","worker"],
        default: "company",
        required: true
    },
    address: { type: String},
    contactName: { type: String},
    contactPhone: { type: String},
    verified: { type: Boolean, default:false, required: true},
    softDelete: { type: Boolean, default:false, required: true}
},
{ timestamps: true }
)


const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;