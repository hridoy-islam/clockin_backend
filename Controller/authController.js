const Company = require("../Model/companyModel");
const Worker = require("../Model/workerModel");
const jsonwebtoken = require('jsonwebtoken');

// Index - Show All Data.
const index = async (req, res) => {

}

// single 
const single = async (req, res) => {

}

// Store New 
const store = async (req, res) => {
    const data = {};
    const query = {
        password: req.body.password,
        $or: [
            { role:'admin' }, 
            { role: 'company' },
            { role: 'worker' }
        ]
        
     };

     try {
        if(req.body.email){
            query.email = req.body.email;
            const company = await Company.findOne(query); 
            if (!company) throw new ApiError('Does not have any company or admin with this credentials');
            data.token = jsonwebtoken.sign({data: company}, 'JWT.secret');
            data.role = company.role;
        }else if(req.body.phone){
            query.phone = req.body.phone;
            const worker = await Worker.findOne(query); 
            if (!worker) throw new ApiError('Does not have any worker with this credentials');
            data.token = jsonwebtoken.sign({data: worker}, 'JWT.secret');
            data.role = worker.role;
        }
        if(data.token)data.sucess = true
        else throw new ApiError('Credentials mismatch')
        return res.status(200).send({ data})
     } catch (error) {
        return res.status(400).send({ error: error.message})
     }

 }

// update 
const update = async (req, res) => { }
// remove 
const remove = async (req, res) => { }

module.exports = { index, single, store, update, remove };