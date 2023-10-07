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
  const { username, email, hourlyRate, affiliation } = req.body;
  const updateFields = {};

  // Check if email is provided and update it
  if (email) {
    updateFields.email = email;
  }

  // Check if hourlyRate is provided and update it
  if (hourlyRate !== undefined) {
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


