var express = require('express');
var mongojs = require('mongojs');
// var db = mongojs("test", ["serviceClients"]);

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var applications = require('./public/features/services/server.js');

var app = express();

var mongodbConnectionString = "mongodb://admin:rxRL59JdQYby@127.12.119.2:27017/apptest";

// if(typeof process.env.OPENSHIFT_MONGODB_DB_URL == "undefined"){
// 	mongodbConnectionString = "atest";
// }

var db =mongojs(mongodbConnectionString, ["serviceClients"]);


//  Set the environment variables we need.
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get("/env", function (req, res){
	res.json(process.env);
});
// //listen quest or url
app.get("/serviceClients", function(req, res){

    db.serviceClients.find(function(err, docs){
    	res.json(docs);
    });
});

app.post("/serviceClients", function(req, res){
	var svc = req.body;
	db.serviceClients.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.get("/serviceClients/:id", function(req, res){
	var id = req.params.id;
	db.serviceClients.findOne({_id : mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});


app.put("/serviceClients/:id", function (req, res) {
    db.serviceClients.findAndModify({
        // find the object by id
        query: { _id: mongojs.ObjectId(req.params.id) },
        // new values are in req.body, update it's name
        update: { $set: { name: req.body.name } },
        // single one
        new: true
    }, function (err, doc, lastErrorObject) {
        // respond with the new document
        res.json(doc);
    });
});


app.delete("/serviceClients/:id", function(req, res){
	var id = req.params.id;
	db.serviceClients.remove({_id : mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});

});

app.listen(port, ipaddress);