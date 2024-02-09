// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");

// Import user routes
const userRoutes = require("./routes/userRoutes");

// Create an Express application
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const uri =
  "mongodb+srv://testuser:testpassword@cluster-1.afrzv5p.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware setup
// Parse incoming JSON requests
app.use(express.json());
// Add security headers with Helmet
app.use(helmet());

// Route setup
// Direct requests to the userRoutes module
app.use("/", userRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
