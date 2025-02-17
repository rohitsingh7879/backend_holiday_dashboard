const mongoose = require('mongoose');

const  operatorScehma = new mongoose.Schema({
    operator: {
        type: String,
        required: true
    },
    ship: {
        type: [String], // Array of strings
        required: true
    },
    isActive: {
        type: Boolean,
        default: true // Default value is true
    }
})

const ship = mongoose.model('operator', operatorScehma);

module.exports = ship;