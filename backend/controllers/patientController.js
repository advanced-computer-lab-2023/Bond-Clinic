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
  try{
    const updatedUser = await patientModel.findOneAndUpdate({username}, {doctor, packages}, {new: true});
    res.status(200).json(updatedUser);
  }
  catch(error){
    res.status(400).json({error: error.message});
  }
};
