import adminModel from "../models/adminModel.js";


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
    res.status(404).json({error: error.message});
  }
}