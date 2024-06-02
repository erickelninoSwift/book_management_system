const contact = require("../model/contact");
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

const updateDataController = async (request, response) => {
  const { id, postedBy } = request.query;
  const currentUserID = request.user._id;
  if (!id || (!postedBy && currentUserID !== postedBy)) {
    return response.json({
      success: false,
      message: "Error user logged In ",
    });
  }
  const { name, email, address, phone } = request.body;
  const getUserContact = await ContactModel.findOneAndUpdate(
    { _id: id, postedBy },
    {
      name,
      email,
      phone,
      address,
    }
  );
  await getUserContact.save().then(() => {
    return response.json({
      success: true,
      message: "Contact was Updated with Succees",
    });
  });
};

const DeleteContactController = async (request, response) => {
  const { id } = request.params;
  if (!id) {
    return response.json({
      success: false,
      message: "Please provide id item to delete",
    });
  }
  try {
    const deleteItem = await ContactModel.findByIdAndDelete({ _id: id });
    if (!deleteItem) {
      return response.json({
        success: false,
        message: "Data to delete was not found",
      });
    }

    const fetchRemainContacts = await ContactModel.find({
      postedBy: request.user._id,
    });
    if (!fetchRemainContacts) {
      return response.status(404).json({
        success: false,
        message: "Current User have no contacts",
      });
    }

    return response.status(201).json({
      success: true,
      message: "Data was deleted",
      contacts: fetchRemainContacts,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addContactController,
  fetchAllContactController,
  updateDataController,
  DeleteContactController,
};
