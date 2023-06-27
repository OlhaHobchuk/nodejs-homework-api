const createError = require("http-errors");
const { Contact } = require("../../models/contact");

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

module.exports = updateFavourite;
