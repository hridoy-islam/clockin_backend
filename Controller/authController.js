const Company = require("../Model/companyModel");
const Worker = require("../Model/workerModel");
const jsonwebtoken = require('jsonwebtoken');
const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({ apiKey: "5d32fcef", apiSecret: "7SolNHoyZmHtJZ2m" })

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
            { role: 'admin' },
            { role: 'company' },
            { role: 'worker' }
        ]

    };

    try {

        if (req.body.email) {
            query.email = req.body.email;
            const company = await Company.findOne(query);
            if (!company) throw new Error('Does not have any company or admin with this credentials');
            data.token = jsonwebtoken.sign({ data: company }, process.env.API_SECRET);
            data.role = company.role;
        } else if (req.body.phone && !req.body.otp) {
            console.log('hello');
            query.phone = req.body.phone;
            const worker = await Worker.findOne(query);
            if (!worker.verified) {

                const sendOTP = await vonage.verify.start({ number: `+88${req.body.phone}`, brand: "Vonage" })
                await Worker.findOneAndUpdate(query, { otpRequestId: sendOTP.request_id }, { new: true });

                if (sendOTP.status === '0') {
                    const worker = await Worker.findOneAndUpdate(query, { otpRequestId: sendOTP.request_id }, { new: true });
                    if (!worker) throw new Error('Does not have any worker with this credentials');
                    data.role = worker.role;
                    data.message = 'Please verify by otp'
                } else data.message = 'Otp sending failed'

            } else {
                data.token = jsonwebtoken.sign({ data: worker }, process.env.API_SECRET);
                data.role = worker.role;
            }
        } else if (req.body.phone && req.body.otp) {
            delete query.password;
            query.phone = req.body.phone;
            const worker = await Worker.findOne(query);
            if (!worker) throw new Error('Does not have any worker with this credentials');
            const verify = await vonage.verify.check(worker.otpRequestId, req.body.otp)
            if (verify.status === '0') {
                data.token = jsonwebtoken.sign({ data: worker }, process.env.API_SECRET);
                data.role = worker.role;
            } else data.message = 'Otp verification failed'
        }
        if (data.message) data.success = false
        else if (data.token) data.success = true
        else throw new Error('Credentials mismatch')
        return res.status(200).send({ data })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }

}

// update 
const update = async (req, res) => {
    try {
        const verify = await vonage.verify.check('d086e130bcbe4ae6b7b86d926ff7bf39', 7324)
        if (verify.status === '0') return res.status(200).send({ verified: true })
        else return res.status(200).send({ verified: false })
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}
// remove 
const remove = async (req, res) => { }

module.exports = { index, single, store, update, remove };