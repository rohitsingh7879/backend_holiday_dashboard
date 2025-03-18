const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({ 
    subscriberFirstName: { 
        type: String,
        default: null
    },
    subscriberSurName: {
        type: String,
        default: null
    },
    subscriberEmail: {
        type: String,
        default: null,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address.'],
        required: [true, 'Email is required.']
    }
});
const subscribeWithMailSchema = new mongoose.Schema({ 
 
    subscriberEmail: {
        type: String,
        default: null,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address.'],
        required: [true, 'Email is required.']
    }
});

const subscriberSchema = mongoose.model('subscribe', subscribeSchema);
const subscribeWithMail = mongoose.model('subscribeWithMail', subscribeWithMailSchema);

module.exports = {subscribeWithMail,subscriberSchema};
