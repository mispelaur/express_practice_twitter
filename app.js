var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var morgan = require('morgan');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('dev')); // alternative to below

// Logging Middleware - btw request and response
// app.use(function(req, res, next){
//   console.log('%s request to %s from %s', req.method, req.path, req.ip);
//   next();
// })

app.get('/', function(req, res){
  res.render('index', { header: 'index page', name: 'Lauren' });
});

app.listen(port, function(){
  console.log('Server started on http://localhost:' + port);
});