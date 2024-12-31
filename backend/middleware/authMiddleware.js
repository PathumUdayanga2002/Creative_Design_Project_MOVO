const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_CODE;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};

const authorize = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ error: "Access denied" });
  next();
};

module.exports = { authenticate, authorize };
