const createError = require("http-errors");
const { Contact } = require("../../models/contact");

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

module.exports = updateContact;
