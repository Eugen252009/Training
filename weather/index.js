const express = require("express");
var app = express();
const https = require("https");
// 9a34b9c4147a93114f7b0131e99ef86b
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log("log recieved");
  console.log(req.body.cityName);
  var cityName = req.body.cityName;
  var query = cityName;
  var apikey = "9a34b9c4147a93114f7b0131e99ef86b";
  var units = "metric";
  var lang = "de";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    units +
    "&lang=" +
    lang;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const datas = JSON.stringify(weatherdata);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      var sendtmp = "<h1>Temperatur in " + cityName + " ist: " + temp + "</h1>";
      res.write(sendtmp);
      res.write("<h3>Das Wetter ist " + desc + "</h3>");
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running");
});

//   res.send("<h1>Hallo!</h1>");
