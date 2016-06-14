// = Requirements ================================================================
	var express = require('express');
	var app = express();
	var bodyParser = require('body-parser');
	var logger = require('morgan');
	var mongoose = require('mongoose');
	var request = require('request');
	var cheerio = require('cheerio');

// = Middleware (pass everything through the logger first) ================================================
	app.use(logger('dev'));
	app.use(bodyParser.urlencoded({
		extended: false
	}));
	app.use(express.static('public')); // (create a public folder and land there)

// = Database configuration ================================================
	mongoose.connect('mongodb://localhost/week18mongoosescraper');
	var db = mongoose.connection;

	db.on('error', function (err) {
		console.log('Mongoose Error: ', err);
	});
	db.once('open', function () {
		console.log('Mongoose connection successful.');
	});

// = Require Schemas ================================================================
	var Note = require('./models/Note.js');
	var Article = require('./models/Article.js');

// = Routes ================================================================
	app.get('/', function(req, res) {
	  res.send(index.html); // sending the html file rather than rendering a handlebars file
	});

	// = api ================================================================

	app.get('/scrape', function(req, res) {
	  request('http://www.nytimes.com/pages/technology/index.html?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page', function(error, response, html) { // "medium's technology section"

			// console.log(html) // request works
	    var $ = cheerio.load(html);
			// console.log(html) // cheerio load works
	    $('article').each(function(i, element) {

					var result = {};

					result.title = $(this).children('a').text();
					result.link = $(this).children('a').attr('href');

					var entry = new Article (result);

					entry.save(function(err, doc) {
					  if (err) {
					    console.log(err);
					  } else {
					    console.log(doc);
					  }
					});


	    });
	  });
	  res.send("Scrape Complete");
	});

	// //Finish the route so it responds with all articles
	// app.get('/articles', function(req, res){
	// 	Article.find({}, function(err, doc){
	// 		if (err){
	// 			console.log(err);
	// 		} else {
	// 			res.json(doc);
	// 		}
	// 	});
	// });
	//
	// 	//Finish the route so it finds one article from the req.params.id,
	// 	//populates "note",
	// 	//and then responds with the article
	// app.get('/articles/:id', function(req, res){
	// 	Article.findOne({'_id': req.params.id})
	// 	.populate('note')
	// 	.exec(function(err, doc){
	// 		if (err){
	// 			console.log(err);
	// 		} else {
	// 			res.json(doc);
	// 		}
	// 	});
	// });
	//
	// 	//save a new note
	// 	//then find an article from the req.params.id
	// 	//and updates "note" with the _id of the new note
	// app.post('/articles/:id', function(req, res){
	// 	var newNote = new Note(req.body);
	//
	// 	newNote.save(function(err, doc){
	// 		if(err){
	// 			console.log(err);
	// 		} else {
	// 			Article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
	// 			.exec(function(err, doc){
	// 				if (err){
	// 					console.log(err);
	// 				} else {
	// 					res.send(doc);
	// 				}
	// 			});
	//
	// 		}
	// 	});
	// });

	app.listen(3008, function() {
	  console.log('App running on port 3008!');
	});
