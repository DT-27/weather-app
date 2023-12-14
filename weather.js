const express = require("express");
const ejs = require("ejs");
const bodyparser = require("body-parser");
const https    = require("https");
const favicon = require('serve-favicon');


      const router = express();

  router.set("view engine","ejs");

  router.set("views", __dirname + "/views");

  router.use(express.static("public"));

  router.use(express.urlencoded({ extended: false }));

  router.use(favicon(__dirname + '/favicon.ico'));


router.get("/",(req,res)=>{
   res.render("cityName")
});


router.post("/city",(req,res)=>{
   let address = req.body.cityname;
   let link= "https://api.openweathermap.org/data/2.5/weather?q=";
   let key = "e71600d9f5e3149fadc382386e2e8603";

  let url =
  https.get(link+encodeURIComponent(address)+"&appid=" + key,(response)=>{
   if (response.statusCode!=200) {
       res.render("wrong");
   }else {
    response.on("data",data=>{
       const weatherData = JSON.parse(data);
         let convert = weatherData.main.temp;
          let temp = convert-273.15;
           let hour = new Date().getHours();
            let min = new Date().getMinutes();
             let day = new Date().getDay();
              let month=new Date().getMonth();
               let year = new Date().getFullYear();

          res.render("weather",
      {
                  temp:Math.floor(temp),
                  hour:hour,
                  min:min,
                  date:Date.now(),
                  city:req.body.cityname,
                  dis:weatherData.weather[0].description,
                  day:day,
                  month:month,
                  year:year


        })
      })
    }
  });




});

router.listen(3030,()=>{
 console.log("listening on port 3030");
});
