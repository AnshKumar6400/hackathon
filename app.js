const express= require('express');
const https= require('https');
const bodyParser= require('body-parser');
const path=require('path');
const app=express();
app.use(
    bodyParser.urlencoded({extended:true}),
    express.static(path.join(__dirname,'public') 
));
app.set('view engine','ejs');
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
    });
app.post('/', function(req, res){
    var location = req.body.location;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=01b8ac6c794dceaa8a1d47e8d7c9b755";
    console.log(location);
    https.get(url, function(response){
        console.log(response.statusCode);
        
    response.on('data', function(data){
        const weatherdata= JSON.parse(data);
        console.log(weatherdata);
    const temp =(weatherdata.main.temp-273.00).toFixed(2);
    const pressure=weatherdata.main.pressure;
    const humidity=weatherdata.main.humidity;
    const icon=weatherdata.weather[0].icon;

    const weatherDescription=weatherdata.weather[0].description;
    console.log(weatherDescription);
        res.render("index",{data:{Temperature:temp,Weather:weatherDescription,location:location,humidity:humidity,icon:icon}});
  
    })
    }) 
});


app.listen('5000',()=>{
console.log('listening on');

})