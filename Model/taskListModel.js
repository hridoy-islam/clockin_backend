const mongoose = require('mongoose')

const taskListSchema = mongoose.Schema({
    taskName: String,
    status: String,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }
});

const TaskList = mongoose.model("Tasklist", taskListSchema);

module.exports = TaskList;