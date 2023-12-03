import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  });
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
    },
    speciality: {
        type: String,
      },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },

    wallet:{
        type: Number,
        default: 0,
    },
    availableTimeSlots: [availabilitySchema],

    availability: [availabilitySchema],
    appointments: [
        {
          date: {
            type: Date,
            required: true,
          },
          status: {
            type: String,
            required: true,
          },
          patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
          },
          type :{
            type:String
          }
        },
      ]
});

export default mongoose.model('Doctor',doctorSchema)