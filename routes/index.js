const express = require("express");
const router = express.Router();

// Index Route
router.get("/", (req, res) => {
    res.render("index/welcome");
});

// Dashboard Route
router.get("/dashboard", (req, res) => {
    res.send("Dashboard");
});

module.exports = router;