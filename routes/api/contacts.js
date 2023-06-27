const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavourite,
} = require("../../controllers/contacts/contacts");

const {
  validateBody,
  isValidId,
  authentificate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", authentificate, listContacts);

router.get("/:contactId", authentificate, isValidId, getContactById);

router.post("/", authentificate, validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", authentificate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authentificate,
  validateBody(schemas.addSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  isValidId,
  validateBody(schemas.updateFavouriteSchema),
  updateFavourite
);

module.exports = router;
