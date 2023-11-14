import patientModel from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import passwordValidator from "password-validator";

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(16) // Maximum length 16
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have at least  digits
  .has()
  .not()
  .spaces(); // Should not have spaces
// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// generate random OTP
import crypto from "crypto";
// const crypto = require('crypto');
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// Using a gmail
import nodemailer from "nodemailer";
import { mongo } from "mongoose";
// const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "csen704Bond@gmail.com",
    pass: "xsfudgbrdfpzkihi",
  },
});

// Sending OTP
async function sendOTP(email, otp) {
  const mailOptions = {
    from: "csen704Bond@gmail.com",
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

// create json web token after login
const maxAge = 3 * 24 * 60 * 60;
const createToken = (username, role) => {
  return jwt.sign({ username, role }, "supersecret", {
    expiresIn: maxAge,
  });
};

// create json web token after reset
const createResetToken = (username, otp) => {
  return jwt.sign({ username, otp }, "supersecret", {
    expiresIn: maxAge,
  });
};

export const logout = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).json({ error: "You're Not Signed in to Logout !!" });
    } else {
      res.clearCookie("jwt");
      res.status(200).json({ mssg: "Successfully Logged Out " });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const patient = await patientModel.findOne({ username: username });
    if (!patient) {
      return res.status(400).json({ error: "Patient Doesn't Exist" });
    }

    if (patient.password !== password) {
      return res.status(400).json({ error: "Incorrect Password" });
    }

    const token = createToken(username, "patient");
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "none",
      secure: true,
    });
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-Credentials", "true");

    res.status(200).json(patient);
    //res.redirect('/admin/home');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { username, email } = req.body;
    const patient = await patientModel.findOne({ username: username });
    if (!patient) {
      return res.status(400).json({ error: "Patient Doesn't Exist" });
    }
    if (patient.email !== email) {
      return res.status(400).json({ error: "Email Doesn't Match" });
    }

    const otp = generateOTP();
    sendOTP(email, otp);

    const token = createResetToken(username, otp);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "none",
      secure: true,
    });
    res.set("Access-Control-Allow-Origin", req.headers.origin);
    res.set("Access-Control-Allow-Credentials", "true");

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const token = req.cookies.jwt;

    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You have not reset your password" });
      } else {
        const savedUsername = decodedToken.username;
        const savedOTP = decodedToken.otp;

        const { OTP, username, newPassword, reNewPassword } = req.body;
        if (username !== savedUsername) {
          res.status(400).json({ message: "You have not reset your password" });
        }

        const patient = await patientModel.findOne({ username: username });

        if (!patient) {
          return res.status(400).json({ error: "Patient Doesn't Exist" });
        }
        if (OTP !== savedOTP) {
          return res.status(400).json({ error: "Wrong OTP" });
        }
        if (newPassword !== reNewPassword) {
          return res
            .status(400)
            .json({
              error: "New Password and Re-input New Password does not match",
            });
        }
        if (!schema.validate(newPassword)) {
          let tempArr = schema.validate(newPassword, { details: true });
          const tempJson = tempArr.map((detail) => ({
            validation: detail.validation,
            message: detail.message,
          }));
          return res.status(400).json(tempJson);
        }
        patient.password = newPassword;
        await patient.save();

        res.status(200).json({ message: "Password resetted successfully" });
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const role = decodedToken.role;

        const { oldPassword, newPassword, reNewPassword } = req.body;
        const patient = await patientModel.findOne({ username: username });

        if (!patient) {
          return res.status(400).json({ error: "Patient Doesn't Exist" });
        }
        if (patient.password !== oldPassword) {
          return res.status(400).json({ error: "Wrong Password" });
        }
        if (newPassword !== reNewPassword) {
          return res
            .status(400)
            .json({
              error: "New Password and Re-input New Password does not match",
            });
        }

        if (!schema.validate(newPassword)) {
          let tempArr = schema.validate(newPassword, { details: true });
          const tempJson = tempArr.map((detail) => ({
            validation: detail.validation,
            message: detail.message,
          }));
          return res.status(400).json(tempJson);
        }
        patient.password = newPassword;
        await patient.save();

        res.status(200).json({ message: "Password updated successfully" });
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// create a new patient
export const createPatient = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    dob,
    gender,
    phoneNumber,
    emergencyFullName,
    emergencyPhoneNumber,
    doctor,
    packages,
  } = req.body;
  try {
    const patient = await patientModel.create({
      username,
      name,
      email,
      password,
      dob,
      gender,
      phoneNumber,
      emergencyFullName,
      emergencyPhoneNumber,
      doctor,
      packages,
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchPatient = async (req, res) => {
  try {
    const patient = await patientModel.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  const { username } = req.body;

  try {
    const deletedUser = await patientModel.findOneAndDelete({ username });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  const { username, doctor, packages } = req.body;
  try {
    const updatedUser = await patientModel.findOneAndUpdate(
      { username },
      { doctor, packages },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//add family member

export const addFamilyMember = async (req, res) => {
  try {
    const patientusername = req.body.username;
    const newFamilyMember = req.body; // The new family member data from the request body

    // Find the patient by username
    const patient = await patientModel.findOne({ username: patientusername });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(newFamilyMember);

    // Save the updated patient document
    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const addPackageToFamilyMember = async (req, res) => {
  try {
    const patientusername = req.body.username;
    const familyMemberName = req.body.familyMemberName; // The ID of the family member to update
    const packageType = req.body.packageType; // The ID of the package to add

    const patient = await patientModel.findOne({ username: patientusername });

    patient.familyMembers.forEach(async (familyMember) => {
      if (familyMember.name == familyMemberName) {
        familyMember.packageType = packageType;
      }
    });
  } catch (error) {
    console.error("Error adding package to family member:", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

//get prescriptions of a patient
export const getPrescriptions = async (req, res) => {
  const username = req.query.username;
  try {
    const patient = await patientModel.findOne({ username });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    const prescriptions = patient.prescription;
    const { name } = doctorModel.findOne({ _id: prescriptions.doctor });
    prescriptions.create(name);
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addPrescription = async (req, res) => {
  const username = req.query.username;
  const { name, price, description, img, date, doctor } = req.body;
  try {
    const prescription1 = await patientModel.findOneAndUpdate(
      { username },
      { prescription: { name, price, description, img, date, doctor } }
    );
    res.status(200).json(prescription1);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get family members of a patient
export const getFamilyMembers = async (req, res) => {
  try {
    const { username } = req.params;

    // Find the patient by username and populate the familyMembers field
    const patients = await patientModel
      .findOne({ username })
      .populate("familyMembers");

    if (!patients) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Extract and send the familyMembers array from the patient document
    const familyMembers = patients.familyMembers;

    res.status(200).json(familyMembers);
  } catch (error) {
    console.error("Error fetching family members:", error);
    res.status(400).json({ message: "Internal server error" });
  }
};

//add doctor to a patient

export const adddoctor = async (req, res) => {
  try {
    const patientusername = req.body.patientusername;
    const doctorid = req.body.doctorid; // The new family member data from the request body

    // Find the patient by username
    const patient = await patientModel.findOneAndUpdate(
      { username: patientusername },
      { doctor: doctorid },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getappointments

export const getappointments = async (req, res) => {
  const { username } = req.params;
  try {
    // Fetch appointments from the database
    const patients = await patientModel
      .findOne({ username })
      .populate("appointments");
    if (!patients) {
      return res.status(400).json({ error: "Patient not found" });
    }
    const appointments = patients.appointments;
    res.status(200).json(appointments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 37 view a list of all doctors along with their speciality, session price (based on subscribed health package if any)

// Fetch all doctors along with their speciality and calculated session price
export const viewDoctorsWithSessionPrice = async (req, res) => {
  try {
    // Fetch all doctors
    const doctors = await Doctor.find().select(
      "name speciality hourlyRate availability"
    );

    // Get the patient's username from the request (you might adjust this based on your actual request structure)
    const { username } = req.body;

    // Find the patient by username and populate the packages field
    const patient = await patientModel
      .findOne({ username })
      .populate("packages");

    // Calculate session price for each doctor
    const doctorsWithSessionPrice = doctors.map((doctor) => {
      // Assume a default discount of 0% if the patient or patient's packages are not available
      let discount = 0;

      // If the patient has a health package, extract the discount
      if (patient && patient.packages) {
        discount = patient.packages.discount;
      }

      // Calculate session price based on the provided formula
      const sessionPrice =
        doctor.hourlyRate +
        0.1 * doctor.hourlyRate -
        (doctor.hourlyRate * discount) / 100;

      return {
        name: doctor.name,
        speciality: doctor.speciality,
        sessionPrice: sessionPrice.toFixed(2), // Round to two decimal places
      };
    });

    res.status(200).json(doctorsWithSessionPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 38 search for a doctor by name and/or speciality

export const searchDoctor = async (req, res) => {
  const { doctorName, speciality } = req.query;

  try {
    let query = {};

    if (doctorName) {
      query.name = { $regex: new RegExp(doctorName, "i") };
    }

    if (speciality) {
      query.speciality = { $regex: new RegExp(speciality, "i") };
    }

    // Find doctors based on the query
    const doctors = await Doctor.find(query);

    if (doctors.length > 0) {
      res.status(200).json(doctors);
    } else {
      res
        .status(404)
        .json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 39 filter a doctor by speciality and/or availability on a certain date and at a specific time

export const filterDoctors = async (req, res) => {
  const { speciality, date, time } = req.query;

  try {
    let query = {};

    if (speciality) {
      query.speciality = { $regex: new RegExp(speciality, "i") };
    }

    // Using availability field
    if (date && time) {
      query.availability = {
        $elemMatch: {
          date: new Date(date),
          time: time,
        },
      };
    }

    // Find doctors based on the query
    const doctors = await Doctor.find(query);

    if (doctors.length > 0) {
      res.status(200).json(doctors);
    } else {
      res
        .status(404)
        .json({ message: "No doctors found with the given criteria." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 40 select a doctor from the search/filter results

export const selectDoctor = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the selected doctor by username
    const selectedDoctor = await Doctor.findOne({ username });

    if (selectedDoctor) {
      res.status(200).json(selectedDoctor);
    } else {
      res
        .status(404)
        .json({ message: "Doctor not found with the given username." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2

// patient adding health record
export const addhealthrecordp = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const role = decodedToken.role;
        const { description } = req.body;
        const file = req.file.path;
        const healthrecord = await patientModel.findOneAndUpdate(
          { username },
          { $push: { healthrecords: { file, description, by: "patient" } } },
          { new: true }
        );
        res.status(200).json({ message: "Health record added successfully." });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Patient removing health record
export const removeHealthRecord = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        const username = decodedToken.username;
        const { recordId } = req.params; // Assuming the record ID is passed as a URL parameter

        // Find the patient and pull the health record from the array
        const updatedPatient = await patientModel.findOneAndUpdate(
          { username },
          { $pull: { healthrecords: { _id: recordId, by: "patient" } } },
          { new: true }
        );

        if (!updatedPatient) {
          // If the patient is not found or the health record does not exist
          return res.status(404).json({ message: "Health record not found." });
        }

        res
          .status(200)
          .json({ message: "Health record removed successfully." });
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};





export const payAppointment = async (req, res) => {
  const { healthPackage } = req.body;
  const { price } = req.body;
  healthPackage = healthPackage.toLowerCase();
  if ( healthPackage == 'silver' )
    price = (price * 1.1) - (price * 1.4);
  else if ( healthPackage == 'gold' )
    price = (price * 1.1) - (price * 1.6);
  else if ( healthPackage == 'platinum' )
    price = (price * 1.1) - (price * 1.8);
  else 
  price = (price * 1.1);
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: `Doctor's Appointment`,
            },
            unit_amount: price * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://localhost:4000/api/patient/success-payment`,
    cancel_url: `http://localhost:4000/api/patient/cancel-payment`,
  });
  res.redirect(303, session.url);
 };
 export const payPackage = async (req, res) => {
  const { patient , packageType , familyNationalID , familySubscription }= req.body;
  let price = 0;
  const healthPackage = packageType.toLowerCase();
  let name = '';
  //const url = 'http://localhost:4000/api/patient/success-payment/patient?='+patient+'/packageType='+packageType+'/familyNationalID='+familyNationalID+'/familySubscription='+familySubscription ;
  if ( healthPackage == 'silver' )
  {
    name = 'Silver Health Package'
    price = 3600;
  }
  else if ( healthPackage == 'gold' )
  {
    name = 'Gold Health Package'
    price = 6000;
  }  
  else if ( healthPackage == 'platinum' )
  {
    name = 'Platinum Health Package'
    price = 9000 ;
  }
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: name,
            },
            unit_amount: price * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:4000/api/patient/success-payment/',
    cancel_url: `http://localhost:4000/api/patient/cancel-payment`,
  });
 }

   export const reserveappointment = async (req, res) => {
 try {
   const token = req.cookies.jwt;
    jwt.verify(token, "supersecret", async (err, decodedToken) => {
      if (err) {
        res.status(400).json({ message: "You are not logged in." });
      } else {
        console.log("test")
        const {  selectedUser, appointment,reservetype } = req.body;
        const username = decodedToken.username;
        console.log(username)
        const patient =await patientModel.findOne({username : username});
        const doctor =await doctorModel.findById(selectedUser._id);
        console.log(doctor.username)
        if (!patient || !doctor) {
          return res.status(404).json({ message: 'Patient or doctor not found.' });
        }
        console.log(patient.username)
        patient.appointments.push({
          date: new Date(appointment.date),
          status: 'reserved',
          doctor: doctor._id,
          type : reservetype
        });
        doctor.appointments.push({
          date: new Date(appointment.date),
          status: 'reserved',
          patient: patient._id,
          type: reservetype
        });
        await patient.save();
        await doctor.save();
        res.status(200).json({ error: 'Appointment reserved successfully.' });

      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

}


export const getWallet = async (req,res) => {
      const token = req.cookies.jwt;
      jwt.verify(token, "supersecret", async (err, decodedToken) => {
        const username = decodedToken.username;
        const patient = await patientModel.findOne({ username: username });
        res.json(patient.wallet);
    });
 }

 export const linkFamily = async (req, res) => {
   const token = req.cookies.jwt;

   jwt.verify(token, 'supersecret', async (err, decodedToken) => {
     if (err) {
       res.status(400).json({message:"You are not logged in."})
     } else {
       const username = decodedToken.username ;
    try {

    const {role,email,number} = req.body; // The new family member data from the request body

    // Find the patient by username
    const patient = await patientModel.findOne({ username: username });
    let familyMember = await patientModel.findOne({email:email}); 
    if(!familyMember)
    familyMember = await patientModel.findOne({phoneNumber:number})
    if (!familyMember)
      return res.status(404).json({ message: "Patient not found" });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    familyMember = await patient.familyMembers.create(
      {
        relationToPatient: role,
        name: familyMember.name,
        gender: familyMember.gender,
        age: familyMember.dob
      }
    )
    // Add the new family member to the patient's familyMembers array
    patient.familyMembers.push(familyMember);

    // Save the updated patient document
    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    console.error("Error adding family member:", error);
    res.status(400).json({ message: "Internal server error" });
  }
}
});
};
export const payAppointment2 = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_PRIVATE_KEY);
    const session = await stripeInstance.checkout.sessions.create({
      line_items: [{
        price_data: {
            currency: 'egp', // or your preferred currency
            product_data: {
                name: `Doctor's Appointment`,
            },
            unit_amount: 100 * 100, // convert to cents
        },
        quantity: 1,
    }],
    mode: 'payment',
    success_url: `http://localhost:3000/patient/success-payment`,
    cancel_url: `http://localhost:3000/patient/cancel-payment`,
  });
  res.redirect(303, session.url);
 };