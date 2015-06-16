var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index', { header: 'index page' });
});

app.listen(port, function(){
  console.log('Server started on http://localhost:' + port);
});