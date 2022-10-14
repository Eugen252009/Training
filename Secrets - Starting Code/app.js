//jshint esversion:6
// Imports
const express = require("express");
const ejs = require("ejs");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Constants

const app = express();
const uri = "mongodb://localhost:27017";
const saltRounds = 10;

// Connect to Database
mongoose.connect(uri);

// App USE
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Vars for Running code
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Plugins
UserSchema.plugin(passportLocalMongoose);

// Models
const User = new mongoose.model("User", UserSchema);

// Strategy
passport.use(new User(UserSchema.authenticate()));

// (de-)Serialize 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post( (req, res) => {
    
  });

app
  .route("/register")
  .get((req, res) => {
    res.render("register");
  })
  .post((req, res) => {
    
  });

app.route("/logout").get((req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Server started!");
});
