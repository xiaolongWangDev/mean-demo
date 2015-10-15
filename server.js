var express = require('express');
var routes = require('./routes');
var app = express();
var serverPort = 3000;

app.use(express.static(__dirname + '/client/dist/static'));

app.get('/', routes.index);
app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  var relativePath = '/client/dist/html/partials/' + name;
  console.log("sending fragment: " + relativePath);
  res.sendFile(__dirname + relativePath);
});

app.listen(serverPort, function () {
		console.log('listening at port ' + serverPort);
});
