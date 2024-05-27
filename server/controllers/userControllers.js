const UserModel = require("../model/user");

const LoginController = async (reuqest, response) => {
  response.json("Login");
};

const SignInController = async (request, response) => {
  response.json("Register");
};

module.exports = { LoginController, SignInController };
