const ContactModel = require("../model/contact");

const addContactController = async (request, response) => {
  const { name, email, phone, address } = request.body;
  if (!name || !email || !phone || !address) {
    return response.json({
      success: false,
      errorFound: "Please do not leave any fields empty",
    });
  }
  try {
    const newContact = new ContactModel({
      postedBy: request.user._id,
      name,
      email,
      phone,
      address,
    });

    await newContact.save().then(() => {
      return response.json({
        success: true,
        contact: newContact._doc,
      });
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      errorFound: error.message,
    });
  }
};

const fetchAllContactController = async (request, response) => {
  try {
    const AllContactsByUser = await ContactModel.find({
      postedBy: request.user._id,
    });
    if (!AllContactsByUser) {
      return response.status(404).json({
        success: false,
        norecord: true,
        errorFound: "No record Found",
      });
    }

    return response.status(201).json({
      success: true,
      contacts: AllContactsByUser,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      errorFound: error.message,
    });
  }
};

module.exports = { addContactController, fetchAllContactController };
