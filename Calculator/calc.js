const express = require("express");
const bodyParser= require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");


});

app.post("/",function(req,res){
   console.log( req.body);
   var num1 =Number(req.body.num1);
   var num2 =Number(req.body.num2);
   
   var result=num1+num2;
   res.send("The Result is: "+result);
})

app.post("/bmi",function(req,res){
    var weight=parseFloat(req.body.weight);
    var height=parseFloat(req.body.height);

        var result=Math.floor(weight/(height*height));
    res.send("Your BMI is:" +result);

});
app.get("/bmi",function(req,res){
    res.sendFile(__dirname+"/bmi.html");

});


app.listen(3000);
