const express      = require('express');
const mongoose     = require("mongoose");
const cookieParser = require("cookie-parser");
const session      = require("express-session");
const passport     = require("passport");
const app          = express();

// Loads Models
require("./models/User");

// Passport Config
require("./config/passport")(passport);

// Loads Routes
const auth = require("./routes/auth");

// Loads Keys
const keys = require("./config/keys");

// Map Global Promises
mongoose.Promise = global.Promise; 

// Mongoose Connect
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Cookie Parser Middleware
app.use(cookieParser());

// Express Session Middleware
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

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