const verifyAdmin = (req, res, next) => {
  const isAdmin = req.headers.authorization === "Bearer admin-token";
  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admins only." });
  }
};

module.exports = { verifyAdmin };
