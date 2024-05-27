export const validation = ({ name, email, password }) => {
  let errors = {};

  const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!name) {
    errors.name = "Name should not be empty";
  } else if (name.length < 3 || name.length > 30) {
    errors.name = "Name length should be Between 3 and 30 letter";
  }

  if (!email) {
    errors.email = "Email should not be empty";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Email is Invalid , Please provide correct email address";
  }

  if (!password) {
    errors.password = "Password should not be empty";
  } else if (!passwordRegex.test(password.trim())) {
    errors.password =
      "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: [@$!%*?&]";
  }

  return errors;
};
