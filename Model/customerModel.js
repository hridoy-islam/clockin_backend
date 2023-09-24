const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: { type: String, required: true},
    location:{ type: String},
    latitude: { type: Number},
    longitude: { type: Number},
    phone: { type: String, required: true, unique: true},
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    softDelete: { type: Boolean, default:false, required: true}
},
{ timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;