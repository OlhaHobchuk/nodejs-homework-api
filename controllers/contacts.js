const createError = require("http-errors");
const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const contactsList = await Contact.find({ owner }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner");
  res.status(200).json(contactsList);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }

  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw createError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const changedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!changedContact) {
    throw createError(404, "Not found");
  }
  res.status(200).json(changedContact);
};

const updateFavourite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const changedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!changedContact) {
    throw createError(404, "Not found");
  }
  res.status(200).json(changedContact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavourite: ctrlWrapper(updateFavourite),
};
