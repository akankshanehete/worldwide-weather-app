const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){
  const query = req.body.cityName;
  const apiKey = "da08a7f7b83d4b7a358f160ae77c4e45"
  const unit = 'metric'
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function (response){
     console.log(response.statusCode);
     response.on("data",function(data){
       const weatherdata = JSON.parse(data);
       const temp = weatherdata.main.temp;
       const description = weatherdata.weather[0].description;
       const icon = weatherdata.weather[0].icon;
       const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
       res.write("<h1> The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
       res.write("<p>The weather is currently "+description+".");
       res.write("<img src="+imageURL+">");
       res.send()   // find a way to make a get request to an open weather maps server in order to display the data from the web API
    })
  })
})

app.listen(2030, function(){
  console.log("Server is running on port 2030");
});
