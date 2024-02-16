const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines Credential schema.
const credentialSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  division: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    required: true,
  },
  ou: {
    type: String,
    enum: [
      "News Management",
      "Software Reviews",
      "Hardware Reviews",
      "Opinion Publishing",
    ],
    required: true,
  },
});

// Exporting the model.
module.exports = mongoose.model(
  "Credential",
  credentialSchema,
  "cool tech credentials"
);
