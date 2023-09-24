const mongoose = require('mongoose')
const { Schema } = mongoose

const workerSchema = new Schema({
    name: { type: String, required: true},
    phone: { type: String, required: true, unique:true},
    password: { type: String, required: true},
    otp: { type: String, default:null},
    holidays: { type: Number, default:0},
    verified: { type: Boolean, default:false},
    softDelete: { type: Boolean, default:false}
}, 
{ timestamps: true }
);

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;