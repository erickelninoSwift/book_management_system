const express = require("express");
const {
  LoginController,
  SignInController,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/login", LoginController);
router.post("/signup", SignInController);

module.exports = router;
