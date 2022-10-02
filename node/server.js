const express =require("express");
const app=express();

app.get("/",function(req, res){
    res.send("<h1>Hello</h1>");
  console.log(req);  
});
app.get("/contact",function(req, res){
    res.send("Contact me @ eugen");

});
app.get("/about",function(req, res){
    res.send("eugen");

});
app.get("/cv",function(req, res){
    res.send("eugens cv");

});
app.listen(3000,console.log("server has started"));

