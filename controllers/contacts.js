const createError = require("http-errors");

const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (_, res) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json(contactsList);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contacts.getContactById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    throw createError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const changedContact = await contacts.updateContact(contactId, req.body);
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
};
