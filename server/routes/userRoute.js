const express = require("express");
const {
  LoginController,
  SignInController,
} = require("../controllers/userControllers");
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

module.exports = router;
