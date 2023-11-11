import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";

import jwt from "jsonwebtoken"


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
