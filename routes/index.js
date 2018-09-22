const express = require("express");
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");

// Index Route
router.get("/", ensureGuest, (req, res) => {
    res.render("index/welcome");
});

// Dashboard Route
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("index/dashboard");
});

// About Route
router.get("/about", (req, res) => {
    res.render("index/about");
});

module.exports = router;