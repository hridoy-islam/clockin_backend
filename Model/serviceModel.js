const mongoose = require('mongoose')

const companySchema = mongoose.Schema({
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
    taskList: Object,
    workerLogin: String,
    workerLogout: String,
    comment: String,
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);

module.exports = Company;