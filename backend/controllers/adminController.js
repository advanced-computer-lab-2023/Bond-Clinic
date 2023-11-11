import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";

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
  const admin = await adminModel.findOne({username:username});
  if (!admin){
    return res.status(400).json({error : "Admin Doesn't Exist"});
  }

  if(admin.password !== password){
    return res.status(400).json({error : "Incorrect Password"});
  }

  const token = createToken(username,"admin");
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
  res.set('Access-Control-Allow-Origin',req.headers.origin);
  res.set('Access-Control-Allow-Credentials','true');


  res.status(200).json(admin);
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
        const role  = decodedToken.role ;

        const { oldPassword, newPassword, reNewPassword } = req.body;
        const admin = await adminModel.findOne({username:username});

        if (!admin){
          return res.status(400).json({error : "Admin Doesn't Exist"});
        }
        if(admin.password !== oldPassword) {
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
        admin.password = newPassword;
        await admin.save();
  
        res.status(200).json({ message: "Password updated successfully" });        
      }
    });
  } catch (error) {
    return res.status(400).json({error : error.message});
  }
}

export const createAdmin = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  try {
    const admin = await adminModel.create({
      username,
      password
    });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const deleteAdmin = async (req, res) => {
  const{username}=req.body;
  try {
    const deletedUser = await adminModel.findOneAndDelete({ username});
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}
//10
// Get a list of pending doctor registration requests
export const getPendingDoctorRequests = async (req, res) => {
  try {
    const pendingDoctors = await doctorModel.find({ status: "pending" });
    res.status(200).json(pendingDoctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accept a doctor request
export const acceptDoctorRequest = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { username },
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reject a doctor request
export const rejectDoctorRequest = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { username },
      { status: "rejected" },
      { new: true }
    );
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//15
// Accept a doctor request
export const acceptDoctorRequestReg = async (req, res) => {
  const { username } = req.params;
  try {
      const doctor = await doctorModel.findOneAndUpdate(
          { username },
          { status: "accepted" },  // Update the status to "accepted"
          { new: true }
      );
      res.status(200).json(doctor);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
