const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

console.log(date.getDate());
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, ListItems: items });
});

app.post("/", function (req, res) {
  const item=(req.body.todo);
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
  console.log(items);
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", ListItems: workItems });
});
app.post("/work", function (req, res) {
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});
app.listen(3000, function () {
  console.log("Server started on Port 3000");
});
