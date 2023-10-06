const jwt = require("jsonwebtoken");
const Company = require("../Model/companyModel");
const Worker = require("../Model/workerModel");
async function isAuthenticated(req, res, next) {
    try {
        let token = req.header('Authorization');
        if (!token) return res.status(404).json({ success: false, msg: "Token not found" });
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.API_SECRET);
        let isAuthenticated = true

        const query = {
            $or: [
                { email: decoded.data.email },
                { phone: decoded.data.phone }
            ]

        };

        switch (decoded.data.role) {
            case ('company' || 'admin'):
                const company = await Company.findOne(query);
                if (!company) isAuthenticated = false
                break;
            case 'worker':
                const worker = await Worker.findOne(query);
                if (!worker) isAuthenticated = false
                break;
        }
        if (isAuthenticated) {
            req.auth = decoded.data
            next()
        }
        else return res.status(404).json({ success: false, msg: "Authentication failed" });
    } catch (error) {
        return res.status(401).json({ success: false, msg: error.message });
    }
}

function verifyRefresh(email, token) {
    try {
        const decoded = jwt.verify(token, "refreshSecret");
        return decoded.email === email;
    } catch (error) {
        // console.error(error);
        return false;
    }
}


module.exports = { isAuthenticated, verifyRefresh }

// const accessToken = jwt.sign({ email: email }, "accessSecret", {
//     expiresIn: "2m",
//     });
//    const refreshToken = jwt.sign({ email: email }, "refreshSecret", {
//     expiresIn: "10m",
//     });