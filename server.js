var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require("mongoose");
var routes = require('./routes');
var missionController = require("./server/js/missionCrudController");
var app = express();
var mongoLabUrl = "mongodb://wisdom3324:12345678@ds039404.mongolab.com:39404/mean-demo";
var serverPort = 3000;


mongoose.connect(mongoLabUrl);



app.use(express.static(__dirname + '/client/dist/static'));
app.use(jsonParser);

app.get('/', routes.index);
app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  var relativePath = '/client/dist/html/partials/' + name;
  console.log("sending fragment: " + relativePath);
  res.sendFile(__dirname + relativePath);
});

app.route('/mission').
	get(missionController.read).
	post(missionController.create);

app.route('/mission/:mission_id').
	delete(missionController.delete);

app.listen(serverPort, function () {
		console.log('listening at port ' + serverPort);
});
