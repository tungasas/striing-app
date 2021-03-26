require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

const app = express();
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Init Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

mongoose
  .connect(
    `mongodb+srv://admin-tung:${process.env.DBPASS}@cluster0.ml0wd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/notes", require("./routes/api/notes"));

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 5000;
}

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
