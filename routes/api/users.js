const express = require("express");
const router = express.Router();

const { validateBody, authentificate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/auth/auth");

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authentificate, getCurrent);

router.post("/logout", authentificate, logout);

router.patch(
  "/",
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  updateSubscription
);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = router;
