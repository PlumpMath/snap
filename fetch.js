var fs = require('fs');
var sys = require('system');
var page = require('webpage').create();

var dir = sys.args[1];
var url = sys.args[2];
var modes = sys.args.slice(3);

page.open(url, function() {
	var info = {
		"url": page.url,
		"title": page.title,
		"date": new Date().toISOString()
	};

	fs.makeTree(dir);

	var infoPath = fs.join(dir, "info.json");
	fs.write(infoPath, JSON.stringify(info));
	info["info"] = infoPath;

	for (var i = 0; i < modes.length; i++) {
		var mode = modes[i];
		var path = fs.join(dir, "page." + mode);

		switch (mode) {
			case "png":
			case "pdf":
				page.render(path);
				break;
			case "txt":
				fs.write(path, page.plainText);
				break;
			case "html":
				fs.write(path, page.content);
				break;
			default:
				console.error("Unknown mode: " + mode + " (availlable modes: png, pdf, txt, html)");
				continue;
		}

		info[mode] = path;
	}

	console.log(JSON.stringify(info));
	phantom.exit();
});
