import packageModel from "../models/packageModel.js";


export const createPackage = async (req, res) => {
  const {
    type, 
    price,
    clinicDiscount,
    pharmacyDiscount,
    familyDiscount,
  } = req.body;
  try {
    const packages = await packageModel.create({
        type, 
        price,
        clinicDiscount,
        pharmacyDiscount,
        familyDiscount
    });
    res.status(200).json(packages);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const deletePackage = async (req, res) => {
  const{type}=req.body;
  try {
    const deletedPackage= await packageModel.findOneAndDelete({type});
    res.status(200).json(deletedPackage);
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

export const updatePackage = async (req, res) => {
  const{type,price,clinicDiscount,pharmacyDiscount,familyDiscount}=req.body;

  try {
    const updatePackage = await packageModel.updateOne({type},{price,clinicDiscount,pharmacyDiscount,familyDiscount}, {new: true});
    res.status(200).json(updatePackage);
  } catch (error) {
    res.status(400).send({error: error.message});
  }
};