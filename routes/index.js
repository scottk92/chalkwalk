var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function(req, res) {
  res.render('index');
});

// GET waiting room
router.get('/waiting_room', function(req, res) {
  res.render('waiting_room');
});

// GET prep room
router.get('/prep', function(req, res) {
  res.render('prep');
});

// GET drawing room
router.get('/drawer', function(req, res) {
  res.render('drawer');
});

// GET drawing room
router.get('/guesser', function(req, res) {
  res.render('guesser');
});

// GET Search for a game
router.get('/gamefinder/:name', function(req, res) {
	var name = req.params.name;
	var db = req.db;
    db.collection('games').find({'name': name}).limit(1).toArray(function (err, items) {
    	res.json(items);
    });
});

// POST Create a game
router.post('/create/:gameName/:username', function(req, res) {
	var gameName = req.params.gameName;
	var username = req.params.username;
	var db = req.db;
	db.collection('games').insert({'name': gameName, 'users': [username], 'master': username, 'active':true}, function(err, result){
		res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
});

// PUT Add a user to a game
router.put('/join/:gameName/:username', function(req, res) {
	var gameName = req.params.gameName;
	var username = req.params.username;
	var db = req.db;
	db.collection('games').update({'name': gameName}, {$push: { users: username }}, function(err, result){
		res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
});

// PUT Close a Game
router.put('/closegame/:gameName', function(req, res) {
	var gameName = req.params.gameName;
	var db = req.db;
	db.collection('games').update({'name': gameName}, {$set: { 'active': false }}, function(err, result){
		res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
	});
});

module.exports = router;
