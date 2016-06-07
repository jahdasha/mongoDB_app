// = Requirements ================================================================s
  var express = require('express');
  var app = express();
  var request = require('request');
  var cheerio = require('cheerio');
  var routes = require('./controllers/burgers_controller.js');


  // = Routes ================================================================
    app.get('/', function(req, res) {
      res.send("Hello world");
    });
