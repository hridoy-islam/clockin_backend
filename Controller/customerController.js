const {faker} = require('@faker-js/faker')
const Customer = require("../Model/customerModel");
// Index - Show All Data.
const index = async (req, res) => {
    Customer.find((err, people) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(people);
    });
}

// single 
const single = async (req, res) => {
    Customer.findById(req.params.id, (err, people) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(people);
    });
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