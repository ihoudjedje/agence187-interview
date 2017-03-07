var express    = require("express");
var app        = express();
var vicopo     = require('vicopo')('http');
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static("public"));



app.get('/', function(req, res){
   res.render("Home");
});

app.post('/Search', function(req, res){
   var ville = req.body.city;
   
   vicopo(ville, function (err, cities) {
        if (err) {
            throw err;
        } else {
            var counter = 0;
            cities.forEach(function(){
            counter++;
        });
            res.render("Home", {data: cities , counter: counter});
            
        }
        });

});
   
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has been started!!");
});
