const Credential = require("../models/credential_model");

module.exports = {
  updateCredential: async (req, res) => {
    const newCredential = req.body;
    try {
      let credential = await Credential.findById(newCredential._id);
      if (!credential) {
        return res.status(404).json({ error: "Credential not found" });
      }
      credential = await Credential.findByIdAndUpdate(
        req.params.id,
        { $set: newCredential },
        { new: true }
      );
      res.json(credential);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },

  getOUCredentials: async (req, res) => {
    try {
      const credentials = await Credential.find({ ou: req.params.OU }).sort({
        division: 1,
      });
      res.json(credentials);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },

  getAllCredentials: async (req, res) => {
    try {
      const credentials = await Credential.find();
      res.json(credentials);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
};
