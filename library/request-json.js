//This is to export the code in this file into another file.
//Then in the file I want to import, I have to use require to import.

//This exports the requestJson function.
//If more functions need to be exported, we put functions inside an object
module.exports = {
    requestJson: requestJson,
    getLocation: getLocation
}

var request = require('request');
var prompt = require('prompt');

function requestJson(url, callbackFunction) {
    
    request(url, function(error, response) {
        //console.log(error);
        //console.log(response);
        if (error) {
            callbackFunction(error);
        }
        else {
            try {
                var parsed = JSON.parse(response.body);
                //next line will only be executed if there is no error in the previous line. If error, it goes to catch
                callbackFunction(null, parsed);
            }
            catch (err) {
                callbackFunction(err);
            }
        }
    });
}



function getLocation() {
    prompt.get('city', function(error, response) {
        if (error) {
            console.log("There is an error");
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

                console.log("latitudeOfCurrentLocation:" + latitudeOfCurrentLocation);
                console.log("longitudeOfCurrentLocation:" + longitudeOfCurrentLocation);
            });
        }
    });
}