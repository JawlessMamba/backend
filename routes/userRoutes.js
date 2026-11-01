const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, requireAdmin } = require("../middleware/authenticate");

// Slow down password guessing: 10 failed logins per IP per 2 minutes
const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many failed login attempts. Please try again in 2 minutes." },
});

router.post("/signin", loginLimiter, userController.signIn);
router.get("/getuser", authenticate, userController.getCurrentUser);

// ADMIN ROUTES - only admins create accounts (no public signup)
router.post("/signup", authenticate, requireAdmin, userController.signUp);
router.get("/all", authenticate, requireAdmin, userController.getAllUsers);
router.put("/change-password", authenticate, requireAdmin, userController.changeUserPassword);
router.patch("/toggle-status/:userId", authenticate, requireAdmin, userController.toggleUserStatus);

module.exports = router;
