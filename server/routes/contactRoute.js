const express = require("express");
const { VerifyCurrentUser } = require("../middleware/VerifyUser");
const router = express.Router();
const {
  addContactController,
  fetchAllContactController,
} = require("../controllers/userContactControllers");

// =============================
router.post("/addcontact", VerifyCurrentUser, addContactController);
router.get("/contacts", VerifyCurrentUser, fetchAllContactController);

module.exports = router;
