import doctorModel from "../models/doctorModel.js";
import patientModel from "../models/patientModel.js";
import jwt from 'jsonwebtoken';
import multer from "multer";

// (Req 4) As a doctor upload and submit required documents upon registrationas a doctor such as ID, Medical licenses and medical degree 
export const uploadDocuments = async (req, res) => {
  // Configure Multer storage
  const storageForDoctors = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/doctors");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    },
  });

  // configure file filtering 
  const fileFilterForDoctors = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || 
        file.mimetype === "image/jpg" || 
        file.mimetype === "image/png" || 
        file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(null, false);
    }
  };

  // Create Multer upload middleware
  const myUpload = multer({ storage: storageForDoctors, limits: 
    {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilterForDoctors }).fields([
      { name: 'medicalId', maxCount: 1 },
      { name: 'medicalLicense', maxCount: 1 },
      { name: 'medicalDegree', maxCount: 1 }
    ]);

  try {
    myUpload(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error uploading image' });
      }
      const token = req.cookies.jwt;
      jwt.verify(token, 'supersecret', async (err, decodedToken) => {
        if (err) {
          res.status(400).json({message:"You are not logged in."})
        } else {
        const doctorusername = decodedToken.username;
        if (!req.files || !req.files.medicalId || !req.files.medicalLicense || !req.files.medicalDegree) {
          return res.status(400).json({ error: 'All files are required (medicalId, medicalLicense, medicalDegree)' });
        }
  
        const { speciality } = req.body;
        const registeredDoctor = await doctorModel.findOne({ username: doctorusername });
        if(!registeredDoctor) {
          return res.status(400).json({ message: "Wrong request ID"});
        }
  
        const medicalId = req.files.medicalId[0].path;
        const medicalLicense = req.files.medicalLicense[0].path;
        const medicalDegree = req.files.medicalDegree[0].path;
  
        registeredDoctor.requiredDocuments = {
            medicalId: medicalId,
            medicalLicense: medicalLicense,
            medicalDegree: medicalDegree,
            speciality: speciality
        };
        await registeredDoctor.save();
  
        return res.status(200).json({message: "Documents uploaded successfully, waiting documents review and employment contract"});
        }
      });
      
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// (Req 14) As a doctor edit/ update my email, hourly rate or affiliation (hospital)
export const updateDoctor = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;
        const { email, hourlyRate, affiliation } = req.body;

        const doctor = await doctorModel.findOne({ username: doctorusername});
        let updated = "";
        if (email !== undefined || email !== "") {
          doctor.email = email;
          updated += "Email, ";
        }
        if (hourlyRate !== undefined || email !== "") {
          doctor.hourlyRate = hourlyRate;
          updated += "Hourly Rate, ";
        }
        if (affiliation !== undefined || email !== "") {
          doctor.affiliation = affiliation;
          updated += "Affiliation";
        }
        
        await doctor.save();
        return res.status(200).json({ message: updated + " updated successfully"});
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 34) As a doctor search for a patient by name
export const searchPatient = async(req, res) => {
  try {
    const { patientName } = req.body;
    const patient = await patientModel.findOne({ name: patientName });
    if(!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 33) As a doctor view a list of all my patients
export const getRegisteredPatients = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;
        const doctor = await doctorModel.find({ username: doctorusername});
        const registeredPatients = doctor.registeredPatients;
        if(registeredPatients.length === 0) {
          return res.status(404).json({ message: "You do not have any registered patient" });
        }
        return res.status(200).json(registeredPatients);
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 35) As a doctor filter patients based on upcoming appointments
export const filterPatientsUpcomingAppointments = async(req, res) => {
  try {
    const { patients } = req.body;
    const upcomingPatients = patients.filter((patient) => {
      const allUpcomingAppointments = patient.appointments.appointment.every(
        (appointment) => appointment.status === "upcoming");
      return allUpcomingAppointments;
    });
    if(upcomingPatients.length === 0) {
      return res.status(200).json({ message: "There is no coming apppointments" });
    }
    return res.status(200).json(upcomingPatients);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 36) As a doctor select a patient from the list of patients
export const selectPatient = async(req, res) => {
  try {
    const { patients, patientId } = req.body;
    const selectedPatient = patients.find(
      (patient) => patient._id === patientId);
    return res.status(200).json(selectedPatient);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 25) As a doctor view information and health records of patient registered with me
export const viewRegisteredPatient = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const { patient } = req.body;
        const doctorusername = decodedToken.username;

        let healthRecords = patient.health.records;
        if(healthRecords.length === 0) {
          return res.status(400).json({ message: "There is no health Records" });
        }
        healthRecords = healthRecords.filter(
          (record) => record.uploadedBy === doctorusername);
        let informationAndHealthRecords = {
          name: patient.name,
          healthRecords: informationAndHealthRecords,
        };
        return res.status(200).json(informationAndHealthRecords);
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 16) As a doctor view the employment contract
export const viewContract = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;
        const doctor = await doctorModel.findOne({ username: doctorusername });

        if (!(doctor.employmentContract && Object.keys(doctor.employmentContract).length > 0)) {
          return res.status(400).json({ message: "you registration and required documents have not yet been accepted"});
        }

        const doctorEmploymentContract = doctor.employmentContract;
        return res.status(200).json(doctorEmploymentContract);
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 16) As a doctor accept the employment contract
export const acceptContract = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;
        const doctor = await doctorModel.findOne({ username: doctorusername});
        doctor.status = "pending";
        doctor.employmentContract.doctorAcceptance = true;
        await doctor.save();
        return res.status(200).json({ message: "Contract accepted successfully, waiting for approval"});
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 17) As a doctor add my available time slots for appointments
export const addAvailableTimeSlots = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;
        const { slots } = req.body;
        const doctor = await doctorModel.findOne({ username: doctorusername });
        
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
        const slotNames = ["1st", "2nd", "3rd", "4th", "5th"];

        for(let i = 0; i < 5; i++) {
          for(let j = 0; j < 5; j++) {
            if(slots[i][j] === true) {
              const workingSlots = {
                day: days[i],
                slot: slotNames[j],
              }

              doctor.workingSlots.push(workingSlots);
            }
          }
        }
        await doctor.save();

        return res.status(200).json({ message: "Available time slots added successfully." });
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 60) As a doctor add new health records for a patient
export const addPatientHealthRecord = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;    
        const { date, description, fileData, fileType, doctorNotes, patientusername } = req.body;
        
        const patient = await patientModel.findOne({ username: patientusername, 'registered.doctors': doctorusername });
        if(!patient) {
          return res.status(403).json({ message: "You are not authorized to add health records for this patient." });
        }
        
        const newHealthRecord = {
          date: date,
          uploadedBy: doctorusername,
          description: description,
          file: {
            data: fileData,
            contentType: fileType,
          },
          doctorNotes: doctorNotes 
        };

        patient.health.records.push(newHealthRecord);
        await patient.save();

        return res.status(200).json({ message: "Health record added successfully." });
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 51) As a doctor schedule a follow-up for a patient
export const followUpAppointment =  async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const doctorusername = decodedToken.username;
        const { patientusername,  } = req.body;
      }
    });
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

// (Req 62) As a doctor add a patient's prescription
export const addPatinetPrescription = async(req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'supersecret', async (err, decodedToken) => {
      if (err) {
        res.status(400).json({message:"You are not logged in."})
      } else {
        const { patientusername, medicine, dosage, duration, filled } = req.body;
        const doctorusername = decodedToken.username;
        const doctor = await doctorModel.findOne({ username: doctorusername});
        const patients = doctor.registered.patients;
        for(patient in patients) {
          if(patient.username === patientusername) {
            const requiredPatient = await patientModel.findOne({ username: patientusername});
            const date = new Date();
            let medicines = {
              medicine: medicine,
              dosage: dosage,
              duration: duration
            };
            let prescription = {
              doctor: doctorusername,
              date: date,
              medicines: [medicines],
              filled: filled
            };
            requiredPatient.prescriptions.push(prescription);
            await requiredPatient.save();
            return res.status(200).json({ message: "Patient prescription is added successfully"});
          }
        }
        return res.status(400).json({message: "You are not allowed to write a prescription for this patient"});
      }
    });
  } catch (error) {
    return res.status(400).json({error: "error adding prescription to patinet"});
  }
};

// //get all appointments
// export const getappointments = async (req, res) => {
//   const token = req.cookies.jwt;
//   if (!token){
//     return res.status(400).json({error:"Not Logged in"})
//      } else {
//       const decodedToken =  jwt.verify(token, 'supersecret') 
//       const username = decodedToken.username ;
//       console.log(username)
//       //const role  = decodedToken.role ;
//   try {
//     // Fetch appointments from the database
//     const doctor = await doctorModel.findOne({ username });
//     if (!doctor) {
//       return res.status(400).json({ error: "Doctor not found" });
//     }

//     // Find patients associated with the doctor and populate their appointments
//     // const patients = await patientModel
//     //   .find({ doctor: doctor._id })
//     //   .populate("appointments");
//     const appointments = doctor.appointments ;

//     res.status(200).json(appointments);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }}
// };
// export const addAvailableTimeSlot = async (req, res) => {
//   const { username, date, time } = req.body;

//   try {
//     // Check if the doctor is accepted by the admin and has accepted the employment contract
//     const doctor = await doctorModel.findOne({ username });
    
//     if (!doctor) {
//       return res.status(404).json({ error: "Doctor not found" });
//     }

//     // Add the new available time slot
//     doctor.availableTimeSlots.push({ date, time });
//     await doctor.save();

//     res.status(200).json(doctor);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// export const getWallet = async (req,res) => {
//   const token = req.cookies.jwt;
//     jwt.verify(token, "supersecret", async (err, decodedToken) => {
//       if (err) {
//         res.status(400).json({ message: "You are not logged in." });
//       } else {
//         const username = decodedToken.username;
//         const doctor = await doctorModel.findOne({ username: username });
//         res.json(doctor.wallet);
//       }
//     });
//  }



// export const reservefollowup = async (req, res) => {
//   try {
//     const token = req.cookies.jwt;
 
//      jwt.verify(token, "supersecret", async (err, decodedToken) => {
//        if (err) {
//          res.status(400).json({ message: "You are not logged in." });
//        } else {
//          console.log("test")
//          const {  appointment } = req.body;
//          const username = decodedToken.username;
//          console.log(username)
//          const doctor =await doctorModel.findOne({username : username});
//          const patient =await patientModel.findById(appointment.patient);
//          console.log(doctor.username)
//          if (!patient || !doctor) {
//            return res.status(404).json({ message: 'Patient or doctor not found.' });
//          }
//          console.log(patient.username)
//          patient.appointments.push({
//            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Add 2 days in milliseconds           ,
//            status: 'reserved',
//            doctor: doctor._id,
//            type : appointment.type
//          });
//          doctor.appointments.push({
//           date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Add 2 days in milliseconds           ,
//           status: 'reserved',
//            patient: patient._id,
//            type : appointment.type
//          });
//          await patient.save();
//          await doctor.save();
//          res.status(200).json({ error: 'Appointment reserved successfully.' });
 
//        }
//      });
//    } catch (error) {
//      res.status(400).json({ error: error.message });
//    }
 
//  }