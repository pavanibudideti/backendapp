const mongoose = require('mongoose');
const moment = require('moment-timezone');

const petschema = new mongoose.Schema({
    petid: {
        type: Number,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    
    pettype: { 
        type: String,
        required: true
    },
    
    requirements: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    postedtime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    },
    seller: {
        type: Object,
        required: true
    }
});

const pet = mongoose.model('Pet', petschema);

function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

module.exports = pet;