const express = require("express");
const router = express.Router();
const credential_controller = require("../controllers/credential_controller");

// Credential endpoint.
router.get("/credentials", credential_controller.getAllCredentials);
router.get("/credentials/:OU", credential_controller.getOUCredentials);
router.put("/credentials/update/:id", credential_controller.updateCredential);

module.exports = router;
