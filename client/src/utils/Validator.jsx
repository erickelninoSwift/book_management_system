export const validation = ({ name, email, password }) => {
  let errors = {};

  const emailRegex = /^[w.-]+@[a-zA-Zd.-]+.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd@$!%*?&]{6,}$/;

  if (!name) {
    errors.name = "Name should not be empty";
  } else if (name.length < 3 || name.length > 30) {
    errors.name = "Name length should be Between 3 and 30 letter";
  } else {
    errors.name = "";
  }

  if (!email) {
    errors.email = "Email should not be empty";
  } else if (!emailRegex.test(email)) {
    errors.email = "Email is Invalid , Please provide correct email address";
  } else {
    errors.email = "";
  }

  if (!password) {
    errors.password = "Password should not be empty";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "[At least one letter,At least one digit,Allows special characters @$!%*?&]";
  } else {
    errors.password = "";
  }

  return errors;
};
