export const validation = ({ name, email, address, phone }) => {
  let errors = {};

  const emailRegex = /[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+/;

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

  if (!address) {
    errors.address = "Address field should not be Empty";
  }

  if (!phone) {
    errors.phone = "Phone field should not be Empty";
  }

  return errors;
};
