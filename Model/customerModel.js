const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    name: String,
    location: String,
    latitude: Number,
    longitude: Number,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;