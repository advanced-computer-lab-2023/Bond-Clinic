import doctorModel from "../models/doctorModel.js";


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
    educationBg
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
      educationBg
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
  const{username,email,hourlyRate,affiliation}=req.body;

  try {
    const updateDoctor = await doctorModel.updateOne({username},{email,hourlyRate,affiliation}, {new: true});
    res.status(200).json(updateDoctor);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}


