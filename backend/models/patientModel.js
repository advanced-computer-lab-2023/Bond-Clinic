import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    }, 
    name: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
        minlength: 8,
    }, 
    dob: {
        type : Date ,
    }, 
    gender: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 11,
    }, 
    emergencyFullName: {
        type: String,
        required: true,
    },
    emergencyPhoneNumber:{
        type: Number,
        required: true,
        minlength: 11,
    }
});

export default mongoose.model('Patient',patientSchema)