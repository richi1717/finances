
var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/' ));
app.get('/*', function response(req, res) {
   res.sendFile(path.join(__dirname, '/' , 'index.html'));
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});
