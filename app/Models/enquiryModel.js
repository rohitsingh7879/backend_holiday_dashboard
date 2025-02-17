const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    cruise_package: { 
        type: String,
        default: null
    },
    date: {
        type: String, 
        default: Date.now
    },
    nights: {
        type: Number,
        default: 0
    },
    operator: {
        type: String,
        default: null
    },
    ship: {
        type: String,
        default: null
    },
    cruise_id: {
        type: String,
        default: null
    },
    name_title: {
        type: String,
        default: null
    },
    fname: {
        type: String,
        default: null
    },
    lname: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    mobile_no: {
        type: String,
        default: null
    },
    best_time_to_call: {
        type: String,
        default: null
    },
    cabins_rating1: {
        type: String,
        default: null
    },
    cabins_rating2: {
        type: String,
        default: null
    },
    cabins_type: {
        type: String,
        default: null
    },
    preferred_departure_airport: {
        type: String,
        default: null
    },
    comments: {
        type: String,
        default: null
    },
    hear_about_us: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: false
    }
});

const Enquiry = mongoose.model('enquiry', enquirySchema);

module.exports = Enquiry;
