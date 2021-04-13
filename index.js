// Get some modules going
const Twit = require('twit');
const T = new Twit({
  consumer_key: 'YOURCONSUMERKEY',
  consumer_secret: 'YOURCONSUMERSECRET',
  access_token: 'YOURACCESSTOKEN',
  access_token_secret: 'YOURACCESSTOKENSECRET'
});

const express = require('express');
const app = express();



// start stream and track specified tweets
const stream = T.stream('statuses/filter', {track: '#JavaScript'});

// use this to log errors from requests, will let you know when you've already retweeted or if you've passed your update limit.
function responseCallback (err, data, response) {
 console.log(err);
}
// event handler
stream.on('tweet', tweet => {

   // retweet
  T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);

  // like
  T.post('favorites/create', {id: tweet.id_str}, responseCallback);
});

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});