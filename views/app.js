
const express= require('express');
const https= require('https');
const bodyParser= require('body-parser');
const path=require('path');
const { error } = require('console');
const app=express();
const twilio=require('twilio');
const { Script } = require('vm');
app.use(
    bodyParser.urlencoded({extended:true}),
    express.static(path.join(__dirname,'public') 
));
// 
app.set('view engine','ejs');
app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
    });




app.post('/', function(req, res){
    var location = req.body.location;
    const url="https://api.openweathermap.org/data/2.5/forecast?q="+location+"&appid=01b8ac6c794dceaa8a1d47e8d7c9b755";
    console.log(location);
    https.get(url, function(response){
        console.log(response.statusCode);
        if(response.statusCode===404){
            res.sendFile(__dirname+"/failure.html")
            app.post("/failure",(req,res)=>{
                res.sendFile(__dirname+"/index.html")
            })
        }
        else{
      try {
        let dataBuffer = '';
        response.on("data", function(data) {
        dataBuffer += data;
        });
        response.on("end", function(data){
            const weatherdata= JSON.parse(dataBuffer);
            const city=weatherdata.city.name;
            console.log(city);
         const temp =(weatherdata.list[0].main.temp-273.00).toFixed(2);
         const humidity=weatherdata.list[0].main.humidity;
        // const humidity=weatherdata.main.humidity;
         const icon=weatherdata.list[0].weather[0].icon;
         const weatherDescription=weatherdata.list[0].weather[0].description;
         const time=weatherdata.list[0].dt_txt;
         const temp1 =(weatherdata.list[9].main.temp-273.00).toFixed(2);
         const humidity1=weatherdata.list[9].main.humidity;
        // const humidity=weatherdata.main.humidity;
         const icon1=weatherdata.list[9].weather[0].icon;
         const weatherDescription1=weatherdata.list[9].weather[0].description;
         const time1=weatherdata.list[9].dt_txt;
         const temp2 =(weatherdata.list[18].main.temp-273.00).toFixed(2);
         const humidity2=weatherdata.list[18].main.humidity;
        // const humidity=weatherdata.main.humidity;
         const icon2=weatherdata.list[18].weather[0].icon;
         const weatherDescription2=weatherdata.list[18].weather[0].description;
         const time2=weatherdata.list[18].dt_txt;
         console.log(time);
         let day=new Date(time);
         console.log(day);
         let date=day.getDate();
         console.log(date);
         let month=day.getMonth();
         console.log(month);
         const monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
        ];
      
       let monthName=monthNames[month];
       console.log(monthName);
       let day1=new Date(time1);
       console.log(day1);
       let date1=day1.getDate();
       console.log(date1);
       let month1=day1.getMonth();
       console.log(month1);
       let monthName1=monthNames[month1];
       let day2=new Date(time2);
       console.log(day2);
       let date2=day2.getDate();
       console.log(date2);
       let month2=day2.getMonth();
       console.log(month2);
       let monthName2=monthNames[month2];
    
    
    
        // console.log(weatherDescription);
        res.render("index",{data:{
            Temperature:temp,Weather:weatherDescription,location:location,humidity:humidity,icon:icon,time:time,monthName:monthName,date:date,month:month,
            Temperature1:temp1,Weather1:weatherDescription1,humidity1:humidity1,icon1:icon1,time1:time1,monthName1:monthName1,date1:date1,time1:time1,monthName1:monthName1,date1:date1,
            Temperature2:temp2,Weather2:weatherDescription2,humidity2:humidity2,icon2:icon2,time2:time2,monthName2:monthName2,date2:date2,time2:time2,monthName2:monthName2,date2:date2
        }});
        const accountSid = 'AC35d1cc5f3bfc03c0988b7f4cdaac8df6';
        const authToken = 'ec6887ed3c7857670adaac4ddc06a31d';
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
          .create({
           
             body: weatherDescription+weatherDescription1+weatherDescription2,
             from: '+16054675662',
             to: '+917386159394'
           })
          .then(message => console.log(message.sid));
        })
        
      } catch (weatherdata)  {
        console.log(error);
        res.sendFile(__dirname+"/failure.html")
        app.post("/failure",(req,res)=>{
            res.sendFile(__dirname+"/index.html")
        })

      }  

      
  }
    }) 

});
app.post("/home",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.listen('5000',()=>{
console.log('listening on');

})



// // --------------------------------------------------------------------------------------------------------------------------------------localhost:5000


// // const express= require('express');
// // const https= require('https');
// // const bodyParser= require('body-parser');
// // const path=require('path');
// // const app=express();
// // app.use(
// //     bodyParser.urlencoded({extended:true}),
// //     express.static(path.join(__dirname,'public') 
// // ));
// // // 
// // app.set('view engine','ejs');
// // app.get("/", function(req, res){
// //     res.sendFile(__dirname+"/index.html");
// //     });
// // app.post('/', function(req, res){
// //     var location = req.body.location;
// //     const url="https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid=01b8ac6c794dceaa8a1d47e8d7c9b755";
// //     console.log(location);
// //     https.get(url, function(response){
// //         console.log(response.statusCode);
// //         if(response.statusCode===404){
// //             res.sendFile(__dirname+"/failure.html")
// //             app.post("/failure",(req,res)=>{
// //                 res.sendFile(__dirname+"/index.html")
// //             })
            
// //         }
// //         else{
        
// //     response.on('data', function(data){
// //         const weatherdata= JSON.parse(data);
// //         console.log(weatherdata);
// //     const temp =(weatherdata.main.temp-273.00).toFixed(2);
// //     const pressure=weatherdata.main.pressure;
// //     const humidity=weatherdata.main.humidity;
// //     const icon=weatherdata.weather[0].icon;

// //     const weatherDescription=weatherdata.weather[0].description;
// //     console.log(weatherDescription);
// //         res.render("index",{data:{Temperature:temp,Weather:weatherDescription,location:location,humidity:humidity,icon:icon}});
  
// //     })}
// //     }) 
// // });

// // app.listen('2000',()=>{
// // console.log('listening on');

// // })
// // -----------------------------------------------------------------------------


// const express= require('express');
// const https= require('https');
// const bodyParser= require('body-parser');
// const path=require('path');
// const { error } = require('console');
// const app=express();
// app.use(
//     bodyParser.urlencoded({extended:true}),
//     express.static(path.join(__dirname,'public') 
// ));
// // 
// app.set('view engine','ejs');
// app.get("/", function(req, res){
//     res.sendFile(__dirname+"/index.html");
//     });
// app.post('/', function(req, res){
//     var location = req.body.location;
//     const url="https://api.weatherapi.com/v1/forecast.json?key=0fff36764a6c4a2dabb53445232701&q=london&days=1&aqi=no&alerts=yes";
//     console.log(location);
//     https.get(url, function(response){
//         console.log(response.statusCode);
//         if(response.statusCode===404){
//             res.sendFile(__dirname+"/failure.html")
//             app.post("/failure",(req,res)=>{
//                 res.sendFile(__dirname+"/index.html")
//             })
            
//         }
//         else{
     
//         response.on('data', function(data){
//         const weatherdata= JSON.parse(data);
//         console.log(weatherdata);
    
    //      const temp =(weatherdata.list[0].main.temp-273.00).toFixed(2);
    //      const humidity=weatherdata.list[0].main.humidity;
    //     // const humidity=weatherdata.main.humidity;
    //      const icon=weatherdata.list[0].weather[0].icon;
    //      const weatherDescription=weatherdata.list[0].weather[0].description;
    //      const time=weatherdata.list[0].dt_txt;
    //      const temp1 =(weatherdata.list[9].main.temp-273.00).toFixed(2);
    //      const humidity1=weatherdata.list[9].main.humidity;
    //     // const humidity=weatherdata.main.humidity;
    //      const icon1=weatherdata.list[9].weather[0].icon;
    //      const weatherDescription1=weatherdata.list[9].weather[0].description;
    //      const time1=weatherdata.list[9].dt_txt;
    //      const temp2 =(weatherdata.list[18].main.temp-273.00).toFixed(2);
    //      const humidity2=weatherdata.list[18].main.humidity;
    //     // const humidity=weatherdata.main.humidity;
    //      const icon2=weatherdata.list[18].weather[0].icon;
    //      const weatherDescription2=weatherdata.list[18].weather[0].description;
    //      const time2=weatherdata.list[18].dt_txt;
    //      console.log(time);
    //      let day=new Date(time);
    //      console.log(day);
    //      let date=day.getDate();
    //      console.log(date);
    //      let month=day.getMonth();
    //      console.log(month);
    //      const monthNames = ["January", "February", "March", "April", "May", "June",
    //      "July", "August", "September", "October", "November", "December"
    //    ];
      
    //    let monthName=monthNames[month];
    //    console.log(monthName);
    //    let day1=new Date(time1);
    //    console.log(day1);
    //    let date1=day1.getDate();
    //    console.log(date1);
    //    let month1=day1.getMonth();
    //    console.log(month1);
    //    let monthName1=monthNames[month1];
    //    let day2=new Date(time2);
    //    console.log(day2);
    //    let date2=day2.getDate();
    //    console.log(date2);
    //    let month2=day2.getMonth();
    //    console.log(month2);
    //    let monthName2=monthNames[month2];
    
    
    
        // console.log(weatherDescription);
//         res.render("index",{data:{
//             Temperature:temp,Weather:weatherDescription,location:location,humidity:humidity,icon:icon,time:time,monthName:monthName,date:date,
//             Temperature1:temp1,Weather1:weatherDescription1,humidity1:humidity1,icon1:icon1,time1:time1,monthName1:monthName1,date1:date1,time1:time1,monthName1:monthName1,date1:date1,
//             Temperature2:temp2,Weather2:weatherDescription2,humidity2:humidity2,icon2:icon2,time2:time2,monthName2:monthName2,date2:date2,time2:time2,monthName2:monthName2,date2:date2
//         }});
      
//         })
        
      
//         console.log(error);
//         res.sendFile(__dirname+"/failure.html")
//         app.post("/failure",(req,res)=>{
//             res.sendFile(__dirname+"/index.html")
//         })

//       }  
//   }
//     ) 
// });

// app.listen('5000',()=>{
// console.log('listening on');

// })