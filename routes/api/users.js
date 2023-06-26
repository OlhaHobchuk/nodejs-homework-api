const express = require("express");
const router = express.Router();

const { validateBody, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/auth");

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

module.exports = router;
