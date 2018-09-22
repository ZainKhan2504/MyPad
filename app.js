const express      = require('express');
const exphbs       = require("express-handlebars");
const mongoose     = require("mongoose");
const cookieParser = require("cookie-parser");
const session      = require("express-session");
const passport     = require("passport");
const path         = require("path");
const app          = express();

// Loads Models
require("./models/User");

// Passport Config
require("./config/passport")(passport);

// Loads Routes
const index = require("./routes/index");
const auth = require("./routes/auth");
const stories = require("./routes/stories");

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

// Handlebars Middleware
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

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

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Use Routes
app.use("/", index);
app.use("/auth", auth);
app.use("/stories", stories);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});