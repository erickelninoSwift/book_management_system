const express = require("express");
const {
  LoginController,
  SignInController,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/login", LoginController);
router.post("/signin", SignInController);

module.exports = router;
