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
        const phone = faker.phone.number();
        const password = faker.internet.password();
        const company = faker.string.uuid();
        const holidays = faker.helpers.rangeToNumber({ min: 20, max: 30 })
        const verified = faker.datatype.boolean();

        const generatedData = {
            name,
            phone,
            password,
            company,
            holidays,
            verified
        }

        data.push(generatedData)

    }

    res.json({
        data,
    })
}


module.exports = { index, single, store, update, remove, fakeData };