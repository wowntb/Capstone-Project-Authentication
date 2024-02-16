const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defines User schema.
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  ou_access: [
    {
      type: String,
      enum: [
        "News Management",
        "Software Reviews",
        "Hardware Reviews",
        "Opinion Publishing",
      ],
    },
  ],
  division_access: [
    {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  ],
});

// Exporting the model.
const User = mongoose.model("User", userSchema, "cool tech users");
module.exports = User;

async function updateAccessForAdminAndManager() {
  // This function grants full access to admin and manager users by adding all divisions and OUs to their access arrays.
  try {
    // Find users with the roles "admin" or "manager"
    const users = await User.find({ role: { $in: ["admin", "manager"] } });

    // Update division_access and ou_access for each user
    users.forEach((user) => {
      // Update division_access
      user.division_access = Array.from({ length: 10 }, (_, i) => i + 1);

      // Update ou_access
      user.ou_access = [
        "News Management",
        "Software Reviews",
        "Hardware Reviews",
        "Opinion Publishing",
      ];

      user.save();
    });
  } catch (error) {
    console.error("Error updating access:", error);
  }
}

// Call the function to update access for admin and manager users.
updateAccessForAdminAndManager();
