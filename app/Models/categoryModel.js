const mongoose = require('mongoose');

const  categorySchema = new mongoose.Schema({ 
    categoryName: { 
        type: String,
        default: null
    },
    categoryImage: {
        type: String,
        default: null
    },
    categoryType:{
        type: String,
        default:null
    }
})

const contactUs = mongoose.model('category', categorySchema);

module.exports = contactUs;