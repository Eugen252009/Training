const express = require("express");
const request = require("request");
const https = require("https");
const http = require("http");
const client = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Mailchimp api key 73ec56937d2ccc3d7f15ef2ac1f969a1-us11
// audience ID 002cc84816
const apiKey = "73ec56937d2ccc3d7f15ef2ac1f969a1-us11";
const prefix = "us11";




client.setConfig({
  apiKey: apiKey,
  server: prefix,
});

app.post("/", async function (req, res) {
  const email = req.body.email;
  console.log( email);
  if (run(email)){
    res.sendFile(__dirname+"/sucsess.html");
  }else{
    res.sendFile(__dirname+"/failure.html");
  }
});
const run = async (email) => {
    const response = await client.lists.addListMember("002cc84816", {
      email_address: email,
      status: "pending",
    });
    console.log(response);
    if (response.statusCode===200){
        return true;
    }else{
        return false;
    }
  };

app.listen(3000, function () {
  console.log("server is running");
});

app.get("/", function (req, res) {
   res.sendFile(__dirname + "/signup.html");
});