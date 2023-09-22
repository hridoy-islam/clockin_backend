const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: { type: String, required: true},
    location:{ type: String},
    latitude: { type: Number},
    phone: { type: String, required: true},
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    softDelete: { type: Boolean, default:false}
},
{ timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;