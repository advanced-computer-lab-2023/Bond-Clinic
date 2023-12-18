import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import doctorModel from "../models/doctorModel.js";
import pharmacistModel from "../models/pharmacistModel.js";
import patientModel from "../models/patientModel.js";
import medicineModel from "../models/medicineModel.js";
import jwt from "jsonwebtoken"
import passwordValidator from 'password-validator';
import crypto from 'crypto';
import nodemailer from "nodemailer";

// (Req 1) As a guest register as a patient using username, name, email, password, date of birth, gender, mobile number, emergency contact ( full name , mobile number)
export const patientRegister = async (req, res) => {
    try {
        const { username, name, email, password, dob, gender, phoneNumber, emergencyContact } = req.body;

        const passwordValidation = validatePassword(password);
        if(passwordValidation) {
            return res.status(400).json({message : passwordValidation[0].message});
        }

        await userModel.create({ username, password, role:"Patient" });
        await patientModel.create({ username, name, email, dob, gender, phoneNumber, emergencyContact });

        return res.status(200).json({message: "Patient Created Successfully"});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
};

// (Req 3) As a guest submit a request to register as doctor using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background
export const doctorRegister = async (req, res) => {
    try {
        const { username, name, email, password, dob, hourlyRate, affiliation, educationBg } = req.body;

        const passwordValidation = validatePassword(password);
        if(passwordValidation) {
            return res.status(400).json({message : passwordValidation[0].message});
        }

        await userModel.create({ username, password, role:"Doctor" });
        const doctorReqesting = await doctorModel.create({ username, name, email, dob, hourlyRate, affiliation, educationBg });

        return res.status(200).json({message: "Registration request submitted successfully, waiting for required documents upload", "requestId": doctorReqesting._id});
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
};

// (Req 2 pharmacy) submit a request to register as a pharmacist using username, name, email, password, date of birth, hourly rate, affiliation (hospital), educational background, 
export const pharmacistRegister = async(req, res) => {
    try {
        const { username, name, email, password, dob, hourlyRate, affiliation, educationBg } = req.body;
        
        const passwordValidation = validatePassword(password);
        if(passwordValidation) {
            return res.status(400).json(passwordValidation);
        }

        await userModel.create({ username, password, role:"Pharmacist" });
        const pharmacistReqesting = await pharmacistModel.create({ username, name, email, dob, hourlyRate, affiliation, educationBg });

        return res.status(200).json({message: "Registration request submitted successfully, waiting for required documents upload", "requestId": pharmacistReqesting._id});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Creating token after forgotPassword and login
const createToken = (data) => {
    const Token = () => {
        const maxAge = 3 * 24 * 60 * 60;
        return jwt.sign(data, 'supersecret', {
            expiresIn: maxAge
        });
    }
    return Token();
};

// clearing token after resetPassword and logout
const clearToken = (res) => {
    res.clearCookie('jwt');
};

// (Req 5) login with username and password
export const login = async(req,res) => {
    try {
        const { username, password } = req.body;        
        const user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if(user.password !== password) {
            return res.status(400).json({ error: "Password not correct"});
        }

        const tokenData = {
            username: user.username,
            role: user.role,
            user: user
        };
        const token = createToken(tokenData);
        const maxAge = 3 * 24 * 60 * 60;
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
        res.set('Access-Control-Allow-Origin',req.headers.origin);
        res.set('Access-Control-Allow-Credentials','true'); 

        return res.status(200).json(tokenData);
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};

// (Req 6) logout
export const logout = async (req, res) => {
    try {

        const token = req.cookies.jwt;
        if (!token){
            return res.status(400).json({error:"You're Not Signed in to Logout !!"});
        } else {
            clearToken(res);
            return res.status(200).json({error : "Successfully Logged Out "})};
    } catch (error) {
      return res.status(400).json({error:error.message});
    }
};

// Sending mail with otp
const sendMail = async(email, otp) => {
    // Sending OTP
    const mailOptions = {
        from: 'csen704Bond@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
    };

    // const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: "csen704Bond@gmail.com",
        pass: "xsfudgbrdfpzkihi",
        },
    });
  
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// (Req 13) reset a forgotten password through OTP sent to email
export const forgotPassword = async(req,res) => {
    try {
        const { username, email } = req.body;
        const otp = crypto.randomInt(100000, 999999).toString();
        const user = await userModel.findOne({ username:username });
        
        if(!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        let userRole;
        if(user.role === "Admin") {
            userRole = await adminModel.findOne({ username: username });
        } else {
            if(user.role === "Doctor") {
                userRole = await doctorModel.findOne({ username: username });
            } else {
                if(user.role === "Pharmacist") {
                    userRole = await pharmacistModel.findOne({ username: username });
                } else {
                    userRole = await patientModel.findOne({ username: username });
                }
            }
            if(userRole.email !== email) {
                return res.status(400).json({ error: 'Email does not match' });
            }
        }
        sendMail(email, otp);

        const tokenData = {
            username: userRole.username,
            otp: otp,
        };
        const token = createToken(tokenData);
        const maxAge = 3 * 24 * 60 * 60;
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000,sameSite: "none", secure: true });
        res.set('Access-Control-Allow-Origin',req.headers.origin);
        res.set('Access-Control-Allow-Credentials','true');

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};

export const validatePassword = (password) => {
    // Create a schema
    var schema = new passwordValidator();

    // Add properties to it
    schema.is().min(8) // Minimum length 8
          .is().max(16) // Maximum length 16
          .has().uppercase() // Must have uppercase letters
          .has().lowercase() // Must have lowercase letters
          .has().digits() // Must have at least  digits
          .has().not().spaces(); // Should not have spaces
          // .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    let tempArr;
    if (!schema.validate(password)) {
        tempArr = schema.validate(password, { details: true });
        const tempJson = tempArr.map(detail => ({
            validation : detail.validation,
            message : detail.message
        }));
        return tempJson;
    } else {
        return null;
    }
};

// (Req 12) change my password
export const resetPassword = async(req,res) => {
    try {
        const token = req.cookies.jwt;
        jwt.verify(token, 'supersecret', async(err, decodedToken) => {
            if(err) {
                return res.status(400).json({err : err.message});
            } else {
                // request from forgotPassword else resetPassword
                if ('otp' in decodedToken) {
                    const savedUsername = decodedToken.username;
                    const savedOTP  = decodedToken.otp;
                    const {OTP, newPassword, reNewPassword} = req.body;
                    if(OTP !== savedOTP) {
                        return res.status(400).json({error : "Wrong OTP"});
                    }
                    if(newPassword !== reNewPassword) {
                        return res.status(400).json({error : "New Password and Re-input New Password does not match"});
                    }
                    const tempJson = validatePassword(newPassword);
                    if(tempJson) {
                        return res.status(400).json(tempJson);
                    } else {
                        const user = await userModel.findOne({ username:savedUsername });
                        user.password = newPassword;
                        await user.save();        
                    }
                } else {
                    const savedUsername = decodedToken.username;
                    const {oldPassword, newPassword, reNewPassword} = req.body;
                    if(newPassword !== reNewPassword) {
                        return res.status(400).json({error : "New Password and Re-input New Password does not match"});
                    }
                    const tempJson = validatePassword(newPassword);
                    if(tempJson) {
                        return res.status(400).json(tempJson);
                    } else {
                        const user = await userModel.findOne({ username:savedUsername });
                        if(user.password !== oldPassword) {
                            return res.status(400).json({error : "Old password is not correct"});
                        }
                        user.password = newPassword;
                        await user.save();

                        res.status(200).json({message: "Password resetted successfully" });
                    }
                }
            }
        });
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};

// (Req 12) As a user (Patient/Pharmacist/Administrator) view a list of all available medicines (including picture of medicine, price, description)
export const viewMedicines = async(req, res) => {
    try {
        const medicines = await medicineModel.find({available: true});
        if(!medicines) {
            return res.status(400).json({ message: "there is no any available medicine" });
        }
        return res.status(200).json(medicines);

    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};

// (Req 14) As a user (Patient/Pharmacist/Administrator) search for medicine based on name
export const searchMedicine = async(req, res) => {
    try {
        const { name } = req.body;
        const medicines = await medicineModel.findOne({ name: name });
        return res.status(200).json(medicines);
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};

// (Req 15) As a user (Patient/Pharmacist/Administrator) filter medicines based on medicinal use
export const filterMedicine = async(req, res) => {
    try {
        const { filter } = req.body;
        if(!filter) {
            return res.status(200).json({message : "Filter parameter is required"});
        }

        const filteredMedicines = await medicineModel.find({ medicalUse: filter });

        return res.status(200).json(filteredMedicines);
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};

// (Req 20) As an Adminstrator / Pharmacist view a total sales report based on a chosen month
export const viewMonthSales = async(req, res) => {
    try {
        const { month, year } = req.body;
        const medicines = await medicineModel.find({});
        const salesReport = [];
        let totalSales = 0;
        let totalCount = 0;

        for(const medicine of medicines) {
            const salesForMonth = medicine.salesHistory.sales.find( 
                (sale) => sale.month === month && sale.year === year
            );

            if (salesForMonth) {
                salesReport.push({
                  name: medicine.name,
                  sales: salesForMonth.amount,
                  count: salesForMonth.count,
                });
                totalSales = totalSales + sales;
                totalCount = totalCount + count;
            }
        }

        salesReport.push({
            name: 'Total',
            sale: totalSales,
            count: totalCount,
        });
        
        return res.status(200).json({ salesReport });
    } catch (error) {
        return res.status(400).json({error : error.message});
    }
};