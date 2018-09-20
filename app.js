const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");
const app = express();

// Passport Config
require("./config/passport")(passport);

// Loads Routes
const auth = require("./routes/auth");

// Index route
app.get("/", (req, res) => {
    res.send("Index");
});

// Use Routes
app.use("/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});