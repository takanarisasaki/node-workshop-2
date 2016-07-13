var requestJson = require('./request-json.js');
var prompt = require('prompt');

var apiKey = '436bbc0301ee8e585cb9b1178ea1d948';

function SynonymsAPI(apiKey) {
    this.apiKey = apiKey;
}

SynonymsAPI.prototype.getSynonyms = function(word, callback) {
    var url = 'http://words.bighugelabs.com/api/2/'+this.apiKey+'/'+word+'/json';
    console.log("url:", url);
    requestJson.requestJson(url, function(error, response) {
        //console.log(response);
        callback(null, response);
    });
}


prompt.get('word', function(error, response){
    //storing user input into variable enteredWord
    var enteredWord = response.word;
    //console.log("Entered word: ", word);
    var newSearch = new SynonymsAPI(apiKey);
    newSearch.getSynonyms(enteredWord, function(error, response) {  //takes the callback from line 14, need to input (null,response) from line 13
        console.log(response);
    });
});


module.exports = {
    SynonymsAPI: SynonymsAPI
}