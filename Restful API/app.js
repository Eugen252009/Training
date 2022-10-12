const { express } = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");


const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "localhost:27017";
const client = new MongoClient(uri);
const database = client.db("wikiDB");
    const articles = database.collection("articles");




const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static("public"));




app.get("/",(req,res)=>{

});



app.post((req,res)=>{

    
});


app.listen(3000,err=>{
console.log("Server läuft");
});