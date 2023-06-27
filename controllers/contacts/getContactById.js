const createError = require("http-errors");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }

  res.status(200).json(contactById);
};

module.exports = getContactById;
