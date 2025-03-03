const mongoose = require('mongoose');

const newBannerSchema = new mongoose.Schema({
    bannerHeading: { 
        type: String,
        default: null
    },
    bannerDescription: {
        type: String,
        default: null
    },
    bannerImage: {
        type: String,
        default: null
    },
    bannerStatus: {
        type: Boolean,
        default: false
    }
});

const Banner = mongoose.model('newBanner', newBannerSchema);

module.exports = Banner;
