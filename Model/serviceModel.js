const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    serviceDate: String,
    serviceTimeStart: String,
    serviceTimeEnd: String,
    status: String,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    taskList: Object,
    workerLogin: String,
    workerLogout: String,
    comment: String,
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;