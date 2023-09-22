const {faker} = require('@faker-js/faker')
const TaskList = require("../Model/taskListModel");
const mongoose = require('mongoose')
// Index - Show All Data.
const index = async (req, res) => {
    try {
        return res.status(200).send({data:await TaskList.find({softDelete:false})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// single 
const single = async (req, res) => {
    try {
        return res.status(200).send({ data : await TaskList.findById({_id:req.params._id})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

// Store New 
const store = async (req, res) => { 
    try { 
        const taskList = await TaskList.findOne({taskName: req.body.taskName});
        if(taskList) return res.status(409).send({ message:'Company already exists'});
        return res.status(200).send({ data:await TaskList.create(req.body)})
    } 
    catch (error) {  
        return res.status(400).send({ error: error.message}) 
    }
}

// update 
const update = async (req, res) => { 
    try {
        const taskList = await TaskList.findById({_id:req.params._id});

        if(taskList._id.toString() !== req.params._id ) return res.status(409).send({ message:'Task list already exists'});
    
        const updateTaskList = await TaskList.findByIdAndUpdate(
            taskList._id,
            req.body,
            {new: true}
        )
        return res.status(200).send({ data:updateTaskList})
    } catch (error) {
        return res.status(400).send({ error: error.message}) 
    }
}
// remove 
const remove = async (req, res) => { 
    try {
        const _id = new mongoose.Types.ObjectId(req.params._id);
        const updateTaskList = await TaskList.findByIdAndUpdate(
            _id,
            {softDelete:true},
            {new: true}
        )
        return res.status(200).send({ data:updateTaskList})
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}

const fakeData = async(req, res)=> {

    let data = [];

    for (let index = 0; index < 10; index++) {
        const taskName = faker.person.fullName();
        const status = 'pending';
        const company = faker.string.uuid();

        const generatedData = {
            taskName,
            status,
            company,
        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}

const archiveList = async (req, res) => {
    try {
        return res.status(200).send({data:await TaskList.find({softDelete:true})});
    } catch (error) {
        return res.status(400).send({ error: error.message})
    }
}


module.exports = { index, single, store, update, remove, fakeData, archiveList };