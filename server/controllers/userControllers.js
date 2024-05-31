const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;
require("dotenv").config();

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
const LoginController = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.json({
      detail: "Please make sure email / password is provided",
    });
  }
  try {
    const selectedUser = await UserModel.findOne({ email });
    if (!selectedUser) {
      return response.json({
        detail: `email : ${email} is not registered`,
      });
    }
    const currentPassword = selectedUser.password;
    const checkPassword = bcrypt.compareSync(password, currentPassword);
    const selectedUserID = selectedUser._id;
    if (!checkPassword) {
      return response.json({
        detail: "Please provide right password",
      });
    }
    const token = jwt.sign(
      { selectedUserID, email, password },
      process.env.SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );
    selectedUser.password = undefined;
    return response.status(200).json({
      success: true,
      email,
      token,
      selectedUser,
    });
  } catch (error) {
    response.json({
      message: "failed to login",
    });
  }
};

const SignInController = async (request, response) => {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.json({
      detail: "Make sure that all fields are provided",
    });
  }
  const hash = hashPassword(password);

  const createUser = new UserModel({
    name,
    email,
    password: hash,
  });

  await createUser
    .save()
    .then(() => {
      const selectedUserID = createUser._doc._id;
      const token = jwt.sign(
        { selectedUserID, name, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "3h",
        }
      );
      createUser._doc.password = null;

      return response.json({
        success: true,
        email,
        token,
        createUser,
      });
    })
    .catch((erroMongo) => {
      return response.json({
        detail: erroMongo,
      });
    });
};

const AuthController = async (request, response) => {
  return response.status(200).json({
    success: true,
    user: request.user,
  });
};

const getAllusersControllers = async (request, response) => {
  try {
    const AllUsers = await UserModel.find({}).select("-password");
    if (!AllUsers) {
      return response.json({
        message: "There is no user registered Currently",
      });
    }

    return response.status(200).json({
      success: true,
      users: AllUsers,
    });
  } catch (error) {
    return response.json({
      detail: `Internal Server Error ${error}`,
    });
  }
};

module.exports = {
  LoginController,
  SignInController,
  AuthController,
  getAllusersControllers,
};
