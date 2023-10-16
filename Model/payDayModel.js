const mongoose = require('mongoose')
const { Schema } = mongoose
const PaydaySchema = new Schema({
    nextpayday: { type: String, required: true },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
},
    { timestamps: true }
)


const Payday = mongoose.model("Payday", PaydaySchema);

module.exports = Payday;