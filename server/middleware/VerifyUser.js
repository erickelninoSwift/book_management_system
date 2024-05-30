const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");
require("dotenv").config();

const VerifyCurrentUser = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      try {
        if (err) {
          return response.status(401).json({
            detail: "Unauthorized user",
          });
        }
        const { email } = payload;
        const user = await UserModel.findOne({ email }).select("-password");
        request.user = user;
        next();
      } catch (erro) {
        return response.json({
          detail: `Server side error ${erro}`,
        });
      }
    });
  } else {
    return response.status(403).json({
      detail: "Forbidden",
    });
  }
};

module.exports = { VerifyCurrentUser };
