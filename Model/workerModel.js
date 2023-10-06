const mongoose = require('mongoose')
const { Schema } = mongoose

const workerSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    holidays: { type: Number, default: 0, required: true },
    verified: { type: Boolean, default: false, required: true },
    otpRequestId: { type: String },
    softDelete: { type: Boolean, default: false, required: true },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    role: {
        type: String,
        default: "worker",
        required: true
    },
},
    { timestamps: true }
);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;