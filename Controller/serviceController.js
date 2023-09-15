const { faker } = require('@faker-js/faker');

// Index - Show All Data.
const index = async (req, res) => {

}

// single 
const single = async (req, res) => {

}

// Store New 
const store = async (req, res) => { }

// update 
const update = async (req, res) => { }
// remove 
const remove = async (req, res) => { }

const fakeData = async (req, res) => {

    let data = [];

    for (let index = 0; index < 10; index++) {
        const serviceDate = faker.date.future();
        const serviceTimeStart = faker.date.future();
        const serviceTimeEnd = faker.date.future();
        const status = 'pendiing';
        const customer = faker.string.uuid();
        const company = faker.string.uuid();
        const workerLogin = faker.date.future();
        const workerLogout = faker.date.future();
        const comment = faker.lorem.text();

        const taskList = [];

        for (let index = 0; index < 5; index++) {
            const taskName = faker.person.fullName();
            const status = 'pending';
            const company = faker.string.uuid();

            const taskListData = {
                taskName,
                status,
                company,
            }

            taskList.push(taskListData)
        }




        const generatedData = {
            serviceDate,
            serviceTimeStart,
            serviceTimeEnd,
            status,
            customer,
            company,
            workerLogin,
            workerLogout,
            comment,
            taskList,

        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}

module.exports = { index, single, store, update, remove, fakeData };