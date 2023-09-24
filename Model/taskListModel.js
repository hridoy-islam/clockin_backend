const mongoose = require('mongoose')

const taskListSchema = mongoose.Schema({
    taskName: { type: String, required: true, unique:true},
    status: { 
        type: String, 
        required: true, 
        enum: ["pending", "completed"],
        default:'pending'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Company',
    },
    softDelete: { type: Boolean, default:false, required: true,}
},
{ timestamps: true }
);

const TaskList = mongoose.model("Tasklist", taskListSchema);

module.exports = TaskList;