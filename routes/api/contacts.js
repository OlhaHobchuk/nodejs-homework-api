const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavourite,
} = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", validateBody(schemas.addSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavouriteSchema),
  updateFavourite
);

module.exports = router;
