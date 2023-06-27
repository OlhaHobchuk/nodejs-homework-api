const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    throw createError(404, `Not found`);
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
