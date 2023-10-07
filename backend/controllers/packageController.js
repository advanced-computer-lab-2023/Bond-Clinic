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
  const { type, price, clinicDiscount, pharmacyDiscount, familyDiscount } = req.body;
  const updateFields = {};

  // Check if price is provided and update it
  if (price !== undefined) {
    updateFields.price = price;
  }

  // Check if clinicDiscount is provided and update it
  if (clinicDiscount !== undefined) {
    updateFields.clinicDiscount = clinicDiscount;
  }

  // Check if pharmacyDiscount is provided and update it
  if (pharmacyDiscount !== undefined) {
    updateFields.pharmacyDiscount = pharmacyDiscount;
  }

  // Check if familyDiscount is provided and update it
  if (familyDiscount !== undefined) {
    updateFields.familyDiscount = familyDiscount;
  }

  try {
    const updatedPackage = await packageModel.findOneAndUpdate(
      { type },
      updateFields,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};