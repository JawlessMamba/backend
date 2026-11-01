// middleware/authenticate.js
const jwt = require("jsonwebtoken");
const { queryRunner } = require("../helpers/queryRunner");
const JWT_SECRET = process.env.JWT_SECRET || "1dikjsaciwndvc";

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // Load role/status from the DB on every request (not from the token), so
    // blocking a user or changing their role takes effect immediately
    const [rows] = await queryRunner(
      "SELECT id, email, role, status FROM user WHERE id = ?",
      [decoded.userId]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ message: "User no longer exists" });
    if (user.status === "blocked") {
      return res.status(401).json({ message: "Your account has been blocked. Please contact administrator." });
    }

    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (err) {
    console.error("Auth lookup failed:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Use after authenticate
exports.requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};
