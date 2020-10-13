var express = require('express');
var path = require('path');
var db = require('../../../db/db.json');
var fs = require('fs');

var app = express();
var PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../../db/db.json"))
});

app.post("/api/notes", function (req, res) {
    var id = { id: req.body.title };
    var merge = { ...id, ...req.body };
    db.unshift(merge);
    fs.writeFile("../../../db/db.json", JSON.stringify(db), function (err) {
        if (err) throw err;
    });
});

app.delete("/api/notes/:id", function (req, res) {
    for (var i = 0; db.length; i++) {
        if (db[i].id === req.params.id) {
            db.splice(i, 1);
            fs.writeFile("../../../db/db.json", JSON.stringify(db), function (err) {
                if (err) throw err;
            });
            return db;
        };
    };
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "../css/styles.css"));
});

app.get("/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.js"));
});

app.listen(PORT, function () {
    console.log('Server listening on port: ' + PORT);
});