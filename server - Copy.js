var express = require('express');
var mongojs = require('mongojs');
var db = mongojs("test", ["serviceClients"]);

var app = express();
//var applications = require('./public/features/services/server.js');

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

//listen quest or url
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

app.listen(3000);