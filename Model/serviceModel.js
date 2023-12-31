const mongoose = require('mongoose')

const serviceSchema = mongoose.Schema({
    serviceName: { type: String, required: true},
    serviceDate: { type: Date, required: true},
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
    workerLogin: { type: Date},
    workerLogout: { type: Date},
    duration: { type: Number},
    comment: { type: String}, 
    softDelete: { type: Boolean, default:false, required: true}
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;