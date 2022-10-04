const express = require("express");
const app= express();

app.get("/",function(req,res){
res.send("Hello");
res.sendFile(__dirname+"/index.html")
});


app.listen(function(){
console.log("Server started on Port 3000");
});


