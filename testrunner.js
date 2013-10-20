//var connect = require('connect');
console.log('starting');
var system = require('system');

console.log(system.env);
console.log(system.env.PORT);
console.log(system.env.IP);

console.log(phantom.libraryPath);

var server = require('webserver').create(),
	system = require('system'),
	fs     = require('fs'),
	port   = system.env.PORT || 8080;

var address = system.env.IP + ':' + system.env.PORT;
console.log(address);
var service = server.listen(port, function(request, response) {
		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html; charset=utf-8');
		response.write(fs.read('index.html'));
		response.close();
});
console.log(service);

var page = require('webpage').create();
var url = 'http://' + system.env.IP + ':' + system.env.PORT;
console.log(url);
page.open(url, function (status) {
    console.log(status);
    if (status === 'success') {
        page.render('index.png');
    
    }
    phantom.exit();
});