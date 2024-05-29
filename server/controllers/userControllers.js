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

    if (!checkPassword) {
      return response.json({
        detail: "Please provide right password",
      });
    }
    const token = jwt.sign({ email, password }, "email&&Password=right", {
      expiresIn: "3h",
    });
    selectedUser.password = undefined;
    return response.status(200).json({
      success: true,
      email,
      token,
      selectedUser,
    });
    //  User was found
    //    ====================
    return response.json({ message: "success" });
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
      const token = jwt.sign({ name, email }, "email&passWord", {
        expiresIn: "1h",
      });
      createUser._doc.password = null;

      console.log(createUser);
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

module.exports = { LoginController, SignInController };
