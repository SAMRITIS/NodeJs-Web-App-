const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
app.set('view engine', 'hbs');
app.set('views', 'template/views/');
hbs.registerPartials('template/partial');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res)=>{
    res.render('index')
})
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.weatherapi.com/v1/current.json?key=346f2b5a9b8848c599774110202412&q=${city}`;
    request(url, function (err, response, body){
        let data = JSON.parse(body);
       
        if(err)
        {
            console.log(err);
            res.render('index', {error: 'Error Occured.'});
        }
        else if(response.statusCode == 400)
        {
            res.render('index', {error: 'No matching location found'});
           
        }
        else
        {
            
            res.render('index', {
                name: data.location.name,
                img: data.current.condition.icon,
                text: data.current.condition.text,
                temp: data.current.temp_c }); 
        }
    })
})
app.listen(port, ()=>{
    console.log(`Hi, I am server listening on ${port}`);
})