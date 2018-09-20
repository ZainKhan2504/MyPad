const express = require('express');
const mongoose = require("mongoose");
const app = express();

// Index route
app.get("/", (req, res) => {
    res.send("Index");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});