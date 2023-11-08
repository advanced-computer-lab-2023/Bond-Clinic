import EmploymentContract from "../models/employmentContractModel.js";

export const viewContract = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const contract = await EmploymentContract.findOne({ doctor: doctorId });

    if (contract) {
      res.status(200).json(contract);
    } else {
      res.status(404).json({ message: "Contract not found for this doctor." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const acceptContract = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const contract = await EmploymentContract.findOneAndUpdate(
      { doctor: doctorId },
      { accepted: true },
      { new: true }
    );

    if (contract) {
      res.status(200).json(contract);
    } else {
      res.status(404).json({ message: "Contract not found for this doctor." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
