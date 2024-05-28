const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};
const LoginController = async (request, response) => {
  const { email, password } = request.body;
  try {
  } catch (error) {
    response.json({
      message: "failed to login",
    });
  }
  response.json({
    email,
    password,
  });
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
      const token = jwt.sign({ name, email }, "email&passWord", {
        expiresIn: "1h",
      });
      return response.json({
        email,
        token,
      });
    })
    .catch((erroMongo) => {
      return response.json({
        detail: erroMongo,
      });
    });
};

module.exports = { LoginController, SignInController };
