const mongoose = require('mongoose')
const { Schema } = mongoose

// giftcard_type: {
//     type: String,
//     enum: ["W", "A"], // Web = W, A= Admin
//     required: true,
//     default: "W",
// },

const CompanySchema = new Schema({
    name: { type: String, required: true},
    email:{ type: String, required: true},
    password: { type: String, required: true},
    phone: { type: String, required: true},
    role:{
        type: String,
        enum: ["admin", "company","worker"],
        default: "company",
    },
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