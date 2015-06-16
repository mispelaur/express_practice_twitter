var express = require('express');
var app = express();
var server = require('http').createServer(app); // creating second express server for web sockets
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var router = express.Router();


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('dev')); // alternative to below

app.use(express.static(__dirname + '/public'));

// Logging Middleware - btw request and response
// app.use(function(req, res, next){
//   console.log('%s request to %s from %s', req.method, req.path, req.ip);
//   next();
// })

router.get('/', function(req, res){
  res.render('index', { header: 'index page', name: 'Lauren' });
});

router.get('/contact', function(req, res){
  res.render('contact', { header: 'contact' });
})

router.get('/about', function(req, res){
  res.render('about', { header: 'about' })
})

app.use('/', router);

server.listen(port, function(){
  console.log('Server started on http://localhost:' + port);
});

var io = require('socket.io')(server);

var Twit = require('twit');

var twitter = new Twit({
  consumer_key:         process.env.EXPRESS_PRACTICE_TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.EXPRESS_PRACTICE_TWITTER_CONSUMER_SECRET,
  access_token:         process.env.EXPRESS_PRACTICE_TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.EXPRESS_PRACTICE_TWITTER_ACCESS_TOKEN_SECRET
})

// console.log(twitter);

var stream = twitter.stream('statuses/filter', { track: 'javascript, ruby' });

//getting all of our streaming tweets and sending it down socket channel directly to client
io.on('connect', function(socket){ 
  // this is coming from the twit module
  // 'tweet' is one of the events it listens to
  stream.on('tweet', function(tweet){
    // this is our own channel, set up to send the tweet down to the client
    // this can be called anything, but must use the same thing on the client
    var data = {};
    data.name = tweet.user.name;
    data.screen_name = tweet.user.screen_name;
    data.text = tweet.text;
    data.user_profile_image = tweet.user.profile_image_url;

    socket.emit('tweets', data)
  })
});


