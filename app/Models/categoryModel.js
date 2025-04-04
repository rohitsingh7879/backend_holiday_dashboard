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

const category = mongoose.model('category', categorySchema);

module.exports = category;