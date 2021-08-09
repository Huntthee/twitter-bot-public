// Get some modules going
const Twit = require('twit');
const config = require('./config')
const T = new Twit(config);

const express = require('express');
const app = express();

var hastagSearch = { q: '#100daysofcode', count: 10, result_type: 'recent' }

// This function finds the latest tweet with the #hashtag, and retweets it.
function retweetLatest () {
    T.get('search/tweets', hastagSearch, function (error, data) {
      var tweets = data.statuses
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text)
      }
      // If our search request to the server had no errors...
      if (!error) {
        // ...then we grab the ID of the tweet we want to retweet...
        var retweetId = data.statuses[0].id_str
        // ...and then we tell Twitter we want to retweet it!
        T.post('statuses/retweet/' + retweetId, {}, tweeted)
      }
      // However, if our original search request had an error, we want to print it out here.
      else {
        if (debug) {
          console.log('There was an error with your hashtag search:', error)
        }
      }
    })
  }
  
  // Make sure it worked!
  function tweeted (err, reply) {
    if (err !== undefined) {
      console.log(err)
    } else {
      console.log('Tweeted: ' + reply)
    }
  }
  
  // Try to retweet something as soon as we run the program...
  retweetLatest()
  // ...and then every hour after that. Time here is in milliseconds, so
  // 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
  setInterval(retweetLatest, 1000 * 60 * 60)

//For avoidong Heroku $PORT error
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});