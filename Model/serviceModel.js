const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    serviceName: { type: String, required: true},
    serviceDate: { type: String, required: true},// format: mm/dd/yyyy
    serviceTimeStart:{ type: String, required: true},
    serviceTimeEnd: { type: String, required: true},
    status: { type: String, required: true},

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    taskList: [{
        taskName: { type: String, required: true},
        status: { type: String, required: true},
    }],
    workerLogin: { type: String},
    workerLogout: { type: String},
    comment: { type: String}, 
    softDelete: { type: Boolean, default:false, required: true}
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;