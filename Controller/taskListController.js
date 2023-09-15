const {faker} = require('@faker-js/faker')
const TaskList = require("../Model/taskListModel");
// Index - Show All Data.
const index = async (req, res) => {
    TaskList.find((err, tasks) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(people);
    });
}

// single 
const single = async (req, res) => {
    TaskList.findById(req.params.id, (err, task) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(task);
    });
}

// Store New 
const store = async (req, res) => { 
    const newTaskList = new TaskList(req.body);
    newTaskList.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newTaskList);
    });
}

// update 
const update = async (req, res) => { 
    TaskList.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, task) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(task);
        }
    )

}
// remove 
const remove = async (req, res) => { }


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


module.exports = { index, single, store, update, remove, fakeData };