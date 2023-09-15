const {faker} = require('@faker-js/faker')
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