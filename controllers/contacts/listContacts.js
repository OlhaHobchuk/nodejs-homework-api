const { Contact } = require("../../models/contact");

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

module.exports = listContacts;
