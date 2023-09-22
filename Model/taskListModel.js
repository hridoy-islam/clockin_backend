const mongoose = require('mongoose')

const taskListSchema = mongoose.Schema({
    taskName: { type: String, required: true, unique:true},
    status: { type: String, required: true, default:'pending'},
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    },
    softDelete: { type: Boolean, default:false}
},
{ timestamps: true }
);

const TaskList = mongoose.model("Tasklist", taskListSchema);

module.exports = TaskList;