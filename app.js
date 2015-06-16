var express = require('express');
var app = express();
var server = require('http').createServer(app); // creating second express server for web sockets
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var router = express.Router();


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('dev')); // alternative to below

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

console.log(twitter);

