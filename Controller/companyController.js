const { faker } = require('@faker-js/faker');
const Company = require("../Model/companyModel");
// Index - Show All Data.
const index = async (req, res) => {
    Company.find((err, people) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(people);
    });
}

// single 
const single = async (req, res) => {
    Company.findById(req.params.id, (err, company) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(company);
    });
}

// Store New 
const store = async (req, res) => {
    const newCompany = new Company(req.body);
    newCompany.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newCompany);
    });
}

// update 
const update = async (req, res) => { 
    Todo.findByIdAndUpdate(
        // the id of the item to find
        req.params.id,
        
        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        req.body,
        
        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        {new: true},
        
        // the callback function
        (err, company) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(company);
        }
    )

}
// remove 
const remove = async (req, res) => { }

const fakeData = async (req, res) => {
    let data = [];
    for (let index = 0; index < 10; index++) {
        const companyName = faker.company.name();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const address = faker.location.streetAddress({ useFullAddress: true });
        const phone = faker.phone.number();
        const contactName = faker.internet.displayName();
        const contactPhone = faker.phone.number();
        const verified = faker.datatype.boolean();
        const generatedData = {
            companyName,
            email,
            password,
            address,
            phone,
            contactName,
            contactPhone,
            verified,
        }
        data.push(generatedData)
    }
    res.json({
        data,
    })
}

module.exports = { index, single, store, update, remove, fakeData };