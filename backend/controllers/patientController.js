import patientModel from "../models/patientModel.js";
import Doctor from "../models/doctorModel.js";

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

// 37 view a list of all doctors along with their speciality, session price (based on subscribed health package if any)

// Fetch all doctors along with their speciality and calculated session price
export const viewDoctorsWithSessionPrice = async (req, res) => {
  try {
    // Fetch all doctors
    const doctors = await Doctor.find().select('name speciality hourlyRate availability');

    // Get the patient's username from the request (you might adjust this based on your actual request structure)
    const { username } = req.body;

    // Find the patient by username and populate the packages field
    const patient = await patientModel.findOne({ username }).populate('packages');

    // Calculate session price for each doctor
    const doctorsWithSessionPrice = doctors.map(doctor => {
      // Assume a default discount of 0% if the patient or patient's packages are not available
      let discount = 0;

      // If the patient has a health package, extract the discount
      if (patient && patient.packages) {
        discount = patient.packages.discount;
      }

      // Calculate session price based on the provided formula
      const sessionPrice = doctor.hourlyRate + (0.1 * doctor.hourlyRate) - (doctor.hourlyRate * discount) / 100;

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
      query.name = { $regex: new RegExp(doctorName, 'i') };
    }

    if (speciality) {
      query.speciality = { $regex: new RegExp(speciality, 'i') };
    }

    // Find doctors based on the query
    const doctors = await Doctor.find(query);

    if (doctors.length > 0) {
      res.status(200).json(doctors);
    } else {
      res.status(404).json({ message: 'No doctors found with the given criteria.' });
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
      query.speciality = { $regex: new RegExp(speciality, 'i') };
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
      res.status(404).json({ message: 'No doctors found with the given criteria.' });
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
      res.status(404).json({ message: 'Doctor not found with the given username.' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};












