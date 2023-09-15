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
        const name = faker.person.fullName();
        const location = faker.location.streetAddress({ useFullAddress: true });
        const latitude = faker.location.latitude();
        const longitude = faker.location.longitude();
        const company = faker.string.uuid();

        const generatedData = {
            name,
            location,
            latitude,
            latitude,
            company,
        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}


module.exports = { index, single, store, update, remove, fakeData };