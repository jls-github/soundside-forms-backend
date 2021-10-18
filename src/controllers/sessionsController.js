const dotenv = require("dotenv");

dotenv.config();

function sessionsController(app) {
    app.post('/login', create)
}

// for now, just check agaist the password and respond with the keuy if it matches up.
function create(req, res) {
    const {password} = req.body
    if (password === process.env.LOGIN_PASSWORD) {
        res.status(201).json({token: process.env.SUBMISSIONS_PASSWORD})
    } else {
        res.status(403).json({ error: "Unauthorized" });
    }
}

module.exports = sessionsController;
