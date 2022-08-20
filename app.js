const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const https=require('https');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'))
app.set('view engine', 'ejs');

app.listen(3000);



app.get('/',(req, res) => {
    res.render('list',{place:'Enter Your City',but:'GET weather'});
})


app.post('/',(req, res) => {
    var q=req.body.city;
    var endpoint='https://api.openweathermap.org/data/2.5/weather';
    var appid='43a4522764a63cccb62c2b3e2d29903e'
    var units='metric';
    var url=endpoint+'?q='+q+'&appid='+appid+'&units='+units;
    var weatherData;
    https.get(url,(response=>{
        response.on("data", (data) => {
        weatherData=JSON.parse(data);
        res.render('list',{place:q,but:weatherData.main.temp+' \'C'});
        })
    }))

   
})