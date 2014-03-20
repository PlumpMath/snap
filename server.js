var express = require('express');
var spawn = require('child_process').spawn;
var path = require("path");
var parseUrl = require('url').parse;

var storeDirectory = process.env.STORE || "store";
var app = express();

var fetch = function(url, modes, cb) {
	var parsedUrl = parseUrl(url);
	var dir = path.join(storeDirectory, parsedUrl.hostname, parsedUrl.pathname.replace(/\//g, "-"), new Date().toISOString());
	var defaultArgs = ["fetch.js", dir, url];
	var process = spawn("phantomjs", defaultArgs.concat(modes));
	var out = "";
	process.stdout.on('data', function(chunk) {
		out += chunk;
	});
	process.on('exit', function(code) {
		cb(JSON.parse(out));
	});
}

app.get('/archive', function(req, res) {
	var url = req.query.url;
	fetch(url, ["png", "txt", "html"], function(result) {
		res.setHeader('Content-Type', 'text/plain');
		res.write(JSON.stringify(result));
		res.end();
	});
});

var port = process.env.PORT;
port = port ? parseInt(port) : 3000;
app.listen(port);
