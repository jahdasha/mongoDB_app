// = Database configuration ================================================
	var mongojs = require('mongojs');
	var databaseUrl = "week18hw";
	var collections = ["articles"];
	var db = mongojs(databaseUrl, collections);

// = connecting to the database (week18hw) =================================
  db.on('error', function(err) {
	  console.log('Database Error:', err);
	});

// = exporting database connection  
module.exports = db;
