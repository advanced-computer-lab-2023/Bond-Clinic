import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";

import jwt from "jsonwebtoken"
import passwordValidator from 'password-validator';

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8) // Minimum length 8
.is().max(16) // Maximum length 16
.has().uppercase() // Must have uppercase letters
.has().lowercase() // Must have lowercase letters
.has().digits() // Must have at least  digits
.has().not().spaces(); // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username,role) => {
    return jwt.sign({ username,role }, 'supersecret', {
        expiresIn: maxAge
    });
};

export const login = async(req,res) => {

  try {
    const { username, password } = req.body;
  const doctor = await doctorModel.findOne({username:username});
  if (!doctor){
    return res.status(400).json({error : "Doctor Doesn't Exist"});
  }

  if(doctor.password !== password){
    return res.status(400).json({error : "Incorrect Password"});
  }

  const token = createToken(username,"doctor");
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
  res.set('Access-Control-Allow-Origin',req.headers.origin);
  res.set('Access-Control-Allow-Credentials','true');


  res.status(200).json(doctor);
  //res.redirect('/admin/home');
  } catch (error) {
    return res.status(400).json({error : error.message})
  }
}

export const changePassword = async(req,res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const username = decodedToken.username ;
        const role  = decodedToken.role;

        const { oldPassword, newPassword, reNewPassword } = req.body;
        const doctor = await doctorModel.findOne({username:username});

        if (!doctor){
          return res.status(400).json({error : "Doctor Doesn't Exist"});
        }
        if(doctor.password !== oldPassword) {
          return res.status(400).json({error : "Wrong Password"});
        }
        if(newPassword !== reNewPassword) {
          return res.status(400).json({error : "New Password and Re-input New Password does not match"});
        }

        if (!schema.validate(newPassword)) {
          let tempArr = schema.validate(newPassword, { details: true });
          const tempJson = tempArr.map(detail => ({
            validation : detail.validation,
            message : detail.message
          }));
          return res.status(400).json(tempJson);
        }
        doctor.password = newPassword;
        await doctor.save();
  
        res.status(200).json({ message: "Password updated successfully" });        
      }
    });
  } catch (error) {
    return res.status(400).json({error : error.message});
  }
}

export const createDoctor = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    phoneNumber,
    hourlyRate,
    affiliation,
    speciality,
    availability,
    educationBg,
    status,
    employmentStatus,
    availableTimeSlots, 
  } = req.body;
  try {
    const doctor = await doctorModel.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      hourlyRate,
      affiliation,
      speciality,
      availability,
      educationBg,
      status,
      employmentStatus,
      availableTimeSlots,
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const fetchDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

export const deleteDoctor = async (req, res) => {
    const{username}=req.body;

    try {
      const deletedUser = await doctorModel.findOneAndDelete({ username});
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

export const updateDoctor = async (req, res) => {
  const { username, email, hourlyRate, affiliation } = req.body;
  const updateFields = {};

  // Check if email is provided and update it
  if (email) {
    updateFields.email = email;
  }

  // Check if hourlyRate is provided and update it
  if (hourlyRate !== undefined !=="") {
    updateFields.hourlyRate = hourlyRate;
  }

  // Check if affiliation is provided and update it
  if (affiliation) {
    updateFields.affiliation = affiliation;
  }

  try {
    const updatedDoctor = await doctorModel.findOneAndUpdate(
      { username },
      updateFields,
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }





};

export const fetchPatients = async (req,res) => {

  try {
    const {username} = req.params
    const doctorr = await doctorModel.findOne({username})
   
    if(!doctorr){
      return res.status(404).json({error:"Doctor not found" });
    }

    const patients = await patientModel.find({ doctor:doctorr._id });

    if (!patients.length) {
      return res.status(404).json({error: "Doctor has No Patients yet !" });
    }

    // Extract and send the familyMembers array from the patient document

    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  
  }




}



//get all appointments
export const getappointments = async (req, res) => {
  const { username } = req.params;
  try {
    // Fetch appointments from the database
    const doctor = await doctorModel.findOne({ username });
    if (!doctor) {
      return res.status(400).json({ error: "Doctor not found" });
    }

    // Find patients associated with the doctor and populate their appointments
    const patients = await patientModel
      .find({ doctor: doctor._id })
      .populate("appointments");

    if (patients.length === 0) {
      return res.status(400).json({ error: "No Patients found" });
    }

    // Extract and return the appointments
    const appointments = patients.reduce((allAppointments, patient) => {
      allAppointments.push(...patient.appointments);
      return allAppointments;
    }, []);

    if (appointments.length === 0) {
      return res.status(400).json({ error: "No Appointments Yet!" });
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const addAvailableTimeSlot = async (req, res) => {
  const { username, date, time } = req.body;

  try {
    // Check if the doctor is accepted by the admin and has accepted the employment contract
    const doctor = await doctorModel.findOne({ username });
    
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (doctor.employmentStatus !== "accepted") {
      return res.status(403).json({ error: "Doctor is not accepted by the admin." });
    }

    // Add the new available time slot
    doctor.availableTimeSlots.push({ date, time });
    await doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




