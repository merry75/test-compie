var express = require('express');
var fs      = require('fs');
var request = require('request');
var math = require('mathjs');
var app     = express();

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    math.sin(dLat/2) * math.sin(dLat/2) +
    math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * 
    math.sin(dLon/2) * math.sin(dLon/2)
    ; 
  var c = 2 * math.atan2(Math.sqrt(a), math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (math.PI/180)
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/branch/:lat/:lng', function(req, res){
  var file = fs.readFileSync("test.json", 'utf8');
  var data = JSON.parse(file);


  var lat = req.params.lat;
  var lng = req.params.lng;
  
  var branches = [];
  for(var key in data){
    console.log(key+": "+data[key]);
    for(var branch in data[key]) {
      branches.push( {
        branch: branch,
        network: key,
        distance: getDistanceFromLatLonInKm(lat, lng, data[key][branch].Latitude, data[key][branch].Longitude)
      });
    }
  }


  console.log(data);
  res.send(branches);
  
})

app.listen(process.env.PORT || '8082');
console.log('Magic happens on port ' + (process.env.PORT || '8082'));
exports = module.exports = app;
