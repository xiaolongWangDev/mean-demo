var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var Schema = mongoose.Schema;

var missionSchema = new Schema({
	name: String
});

var Mission = mongoose.model("Mission", missionSchema);

/* add new document */
exports.create = function(req, res) {
	Mission.create(req.body, function(err, mission){
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(mission);
		}
	});
};

/* find all document */
exports.read = function(req, res) {

	Mission.find(function(err, missions){
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(missions);
		}
	});
};

/* delete the document with specified ID */
exports.delete = function(req, res) {
	Mission.remove({_id: req.params.mission_id}, function(err, missions){
		if(err) {
			res.status(500).send(err);
		} else {
			res.end();
		}
	});
};