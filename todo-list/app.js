const express = require("express");
const app = express();
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistdb");

const items = {};
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

console.log(date.getDate());

const itemSchema = new mongoose.Schema({
  name: String,
});

const Tasks = mongoose.model("Task", itemSchema);

const DefaultItems = [
  { name: "New LiSt" },
  { name: "ADD" },
  { name: "Delete" },
];

const listSchema = {
  name: String,
  items: [itemSchema],
};
const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
  Tasks.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundItems);
      if (foundItems.length === 0) {
        Tasks.insertMany(DefaultItems, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully added Default Items!");
          }
        });
        res.redirect("/");
      }
      res.render("list", { listTitle: "Heute", ListItems: foundItems });
    }
  });
  // const day = date.getDate();
  // const tasks = Tasks.find({}, (err, task) => {
  //   res.render("list", { listTitle: day, ListItems: task });
});

app.post("/", function (req, res) {
  const itemName = req.body.todo;
  const listName = req.body.list;

  const item = new Tasks({
    name: itemName,
  });

  if (listName === "Heute") {
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, list) => {
      list.items.push(item);
      console.log(item);
      console.log(list);
      list.save();
      res.redirect("/" + listName);
    });
  }
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/delete", (req, res) => {
  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;
if (listName==="Heute"){
  List.findByIdAndRemove(checkedItemID, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Erfolgreich!");
    }
    res.redirect("/");
  });
}else{
  List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemID} }},(err,result)=> {
    console.log(err);
    if(!err){
      res.redirect("/"+listName);
    }
    console.log(result);
  });


}
  
});

app.get("/:adress", (req, res) => {
  const adress = req.params.adress;

  List.findOne(
    {
      name: adress,
    },
    (err, listed) => {
      if (!err) {
        if (!listed) {
          const liSt = new List({
            name: adress,
            items: DefaultItems,
          });
          liSt.save();
          res.redirect("/" + adress);
        } else {
          res.render("list", {
            listTitle: listed.name,
            ListItems: listed.items,
          });
        }
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(3000, function () {
  console.log("Server started on Port 3000");
});
