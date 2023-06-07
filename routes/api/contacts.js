const express = require("express");

const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts");

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(schemas.addSchema), updateContact);

module.exports = router;
