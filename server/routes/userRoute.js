const express = require("express");
const {
  LoginController,
  SignInController,
  AuthController,
  getAllusersControllers,
} = require("../controllers/userControllers");
const { VerifyCurrentUser } = require("../middleware/VerifyUser");
const validator = require("express-validator");

const router = express.Router();

router.post(
  "/login",
  [
    validator
      .body("email")
      .trim()
      .notEmpty()
      .withMessage("email should not be empty"),
    validator
      .body("password")
      .trim()
      .notEmpty()
      .withMessage("password should not be empty")
      .isLength({ min: 5, max: 100 })
      .withMessage("Password should be between 5 - 30 letters"),
  ],
  LoginController
);
router.post(
  "/signup",
  [
    validator
      .body("name")
      .trim()
      .notEmpty()
      .withMessage("name should not be empty"),
    validator
      .body("email")
      .trim()
      .notEmpty()
      .withMessage("email should not be empty"),
    validator
      .body("password")
      .trim()
      .notEmpty()
      .withMessage("password should not be empty")
      .isLength({ min: 5, max: 100 })
      .withMessage("Password should be between 5 - 30 letters"),
  ],
  SignInController
);

router.get("/verify", VerifyCurrentUser, AuthController);
router.get("/allusers", getAllusersControllers);

module.exports = router;
