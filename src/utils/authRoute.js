const dotenv = require("dotenv");

dotenv.config();

function authRoute(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  if (req.headers.authorization !== process.env.SUBMISSIONS_PASSWORD) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  next();
}

module.exports = authRoute;
