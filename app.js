
var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist' ));
app.get('/*', function response(req, res) {
   res.sendFile(path.join(__dirname, '/' , 'index.html'));
});

app.get('/', function(request, response) {
  response.render('dist/index')
});
// app.listen(8080, function () {
//     console.log('Example app listening on port 8080!');
// });

// var express = require('express');
// var app = express();
//
//
app.set('port', (process.env.PORT || 5000));
//
// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// // app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index')
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
