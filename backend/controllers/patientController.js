import patientModel from "../models/patientModel.js";

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
    });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchPatient = async (req, res) => {
  try {
    const doctors = await patientModel.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};

export const deletePatient = async (req, res) => {
  const{username}=req.body;
  
  try {
    const deletedUser = await patientModel.findOneAndDelete({ username });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({error: error.message});
  }
};