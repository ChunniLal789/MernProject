const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log("Admin users error");
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No messages found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    console.log("Admin contacts error");
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    console.log("Get user data by id controller");
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Delete users controller error");
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUser,
      }
    );
    return res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log("Update user controller error");
  }
};

const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.log("Delete contact controller error");
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  getUserById,
  deleteUserById,
  deleteContactById,
  updateUserById,
};
