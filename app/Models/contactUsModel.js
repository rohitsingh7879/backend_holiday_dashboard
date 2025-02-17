const mongoose = require('mongoose');

const  contactSchema = new mongoose.Schema({
    fname: {
        type: String,
        default : null
    },
    lname: {
        type: String,
        default : null
    },
    email: {
        type: String,
        required : true
    },
    phoneNumber : {
        type: String,
        default : null
    },
    message : {
        type: String,
        default : null
    },
})

const contactUs = mongoose.model('contactUs', contactSchema);

module.exports = contactUs;