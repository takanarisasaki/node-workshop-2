var requestJson = require("./library/request-json.js");
var request = require('request');
var prompt = require('prompt');
var colors = require('colors');
var Table = require('cli-table');
var emoji = require('node-emoji');


function getLocation() {
    var location;
    var currentLocation = prompt.get('city', function(error, response) {
        if (error) {
            console.log("There is an error in prompt");
        }
        else {
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + response.city;
            request(url, function(error, response) {
                //console.log(JSON.parse(response.body).results[0].geometry.location);
                if (error) {
                    console.log("There is an error");
                }
                else {
                    var latitudeOfCurrentLocation = JSON.parse(response.body).results[0].geometry.location.lat;
                    var longitudeOfCurrentLocation = JSON.parse(response.body).results[0].geometry.location.lng;
                }
                
                location = {
                    latitude: latitudeOfCurrentLocation,
                    longitude: longitudeOfCurrentLocation
                };
                
                var table = new Table({
                    head: ['', 'Value'],
                    colWidths: [35, 17]
                });
                
                table.push(
                    [colors.green("Latitude of Current Location"), latitudeOfCurrentLocation],
                    [colors.green("Longitude of Current Location"), longitudeOfCurrentLocation]
                );
                
                console.log(table.toString());
                
                //console.log(colors.red("latitudeOfCurrentLocation:") + colors.green(latitudeOfCurrentLocation));
                //console.log(colors.red("longitudeOfCurrentLocation:") + colors.green(longitudeOfCurrentLocation));
                
                
                //Find the weather of the entered location
                var urlOfWeather = 'https://api.forecast.io/forecast/a1fda184c0b0d23cb519146b13934c97/' + latitudeOfCurrentLocation + ',' + longitudeOfCurrentLocation;


                
                //Use requestJson function
            
                requestJson.requestJson(urlOfWeather, function(error, response) {   //response is parsed in request-json.js, so response = response.body, or response = parsed here
                    //console.log(response.currently);
                    console.log(emoji.get('sunny'), emoji.get('cloud'), emoji.get('umbrella'), emoji.get('snowman'));


/*
                    var table2 = new Table({
                        head: ['Table 1', 'Table 2'],
                        colWidths: [100, 200]
                    });
                    
                    table2.push()
                    
                    console.log(table2.toString());
                    
                    
              */      
                    var currentLocationWeather = response.currently;
                    //console.log(colors.red('Current Weather'), currentLocationWeather);
                    
                    
                    var table2 = new Table ({
                        head: ['Key', 'Value'],
                        colWidths: [25, 25]
                    });
                    
                    console.log(colors.red('Current Weather:'));
                    
                    Object.keys(currentLocationWeather).forEach(function(key){
                        table2.push([colors.green(key), currentLocationWeather[key]]);
                    })
                    console.log(table2.toString());
                    
                    
                    var nextFiveDaysWeather = [];
                    for (var i = 0; i < 5; i++) {
                        nextFiveDaysWeather.push(response.daily.data[i]);
                    }
                        
                    console.log(colors.red("Weather of next 5 days"), nextFiveDaysWeather);
                    
                });
                
                

            });
        }
    });
}



getLocation();

