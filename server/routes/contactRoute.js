const express = require("express");
const { VerifyCurrentUser } = require("../middleware/VerifyUser");
const router = express.Router();
const {
  addContactController,
  fetchAllContactController,
  updateDataController,
  DeleteContactController,
} = require("../controllers/userContactControllers");

// =============================
router.post("/addcontact", VerifyCurrentUser, addContactController);
router.get("/contacts", VerifyCurrentUser, fetchAllContactController);
router.put("/contacts", VerifyCurrentUser, updateDataController);
router.delete("/contacts/:id", VerifyCurrentUser, DeleteContactController);

module.exports = router;
