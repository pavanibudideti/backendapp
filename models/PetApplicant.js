const mongoose = require('mongoose');
const moment = require('moment-timezone');

const petApplicantSchema = new mongoose.Schema({
    applicantId: {
        type: String,
        unique: true,
        required: true,
        default: () => generateRandomId()
    },
    //this value will be taken from Job model
    petid: {
        type: Number,
        required: true
    },
    //this value will be taken from Job Seeker model
    customeremail: {
        type: String,
        required: true
    },
    petStatus: {
        type: String,
        required: true,
        default: "APPLIED"
    },
    appliedTime: {
        type: String,
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
    }
});

const PetApplicant = mongoose.model('PetApplicant', petApplicantSchema);

function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "J" + randomNumber;
}

module.exports = PetApplicant;