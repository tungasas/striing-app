require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Init Middleware
app.use(express.json());

mongoose.connect(
  "mongodb+srv://tung:tungkon97@cluster0.ml0wd.mongodb.net/striingDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Passport Strategy
passport.use(User.createStrategy());
// Enable Passport session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/notes", require("./routes/api/notes"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
