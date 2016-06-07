// = Requirements ================================================================s
  var express = require('express');
  var router = express.Router();
  //var articles = require('../models/articles.js');

  // = Routes ================================================================
    // = Get route -> index page
  app.get('/', function(req,res) {
  		res.redirect('/articles')
  });

  // router.get('/articles', function(req,res) {
  // 	//express callback response by calling articles.selectAllArticles
  // 	articles.all(function(articles_data){
  // 		//wrapper for orm.js that using MySQL query callback will return articles_data, render to index with handlebar
  // 		res.render('index', {articles_data});
  // 	});
  // });

  module.exports = router;
