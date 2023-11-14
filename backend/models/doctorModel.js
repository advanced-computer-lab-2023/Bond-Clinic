import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    
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
    hourlyRate: {
        type: Number,
        required: true,
    },
    affiliation: {
        type: String,
        required: true,
    },
    educationBg: {
        type: String,
        required: true,
<<<<<<< Updated upstream
=======
    },
    speciality: {
        type: String,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
      employmentStatus: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
    availableTimeSlots: [availabilitySchema],
    availability: [availabilitySchema],
    wallet:{
        type: Number,
        default: 0,
>>>>>>> Stashed changes
    }
});

export default mongoose.model('Doctor',doctorSchema)