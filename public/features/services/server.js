module.exports = function (app, db, mongojs) {
    // map incoming HTTP URL patterns to execute various functions
    // handle HTTP GET request to read all serviceClients from the database
    app.get("/serviceClients", function (req, res) {
        db.serviceClients.find(function (err, docs) {
            res.json(docs);
        });
    });

    // handle HTTP POST request to insert new serviceClients into the database
    app.post("/serviceClients", function (req, res) {
        var svc = req.body;
        db.serviceClients.insert(req.body, function (err, doc) {
            res.json(doc);
        });
    });


    app.get("/serviceClients/:id", function (req, res) {
        var id = req.params.id;
        db.serviceClients.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
            res.json(doc);
        });
    });

    // handle HTTP PUT request to update serviceClient instance with :id parameter
    app.put("/serviceClients/:id", function (req, res) {
        db.serviceClients.findAndModify({
            query: { _id: mongojs.ObjectId(req.params.id) },
            update: { $set: { name: req.body.name } },
            new: true
        }, function (err, doc, lastErrorObject) {
            res.json(doc);
        });
    });

    // handle HTTP DELETE request to remove a serviceClient with :id parameter
    app.delete("/serviceClients/:id", function (req, res) {
        var id = req.params.id;
        db.serviceClients.remove({ _id: mongojs.ObjectId(id) },
            function (err, doc) {
                res.json(doc);
            });
    });
}