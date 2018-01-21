var iframe = document.getElementById("iframe");
iframe.src = "http://www.lz365golf.com/server/ad#/game-over";

const net = require('net');
var port = 9207;
var host = '127.0.0.1';
var client = new net.Socket();
client.setEncoding('utf-8');

var scan = function () {
	client.connect(port, host);
	client.write('scandev', function () {
		client.end();
	});
};

var sendScanFailEvent = function () {
	var event = new Event('scan-fail');
	iframe.contentWindow.dispatchEvent(event);
};

client.on('data', function (data) {
	if ("success%00" == encodeURIComponent(data)) {

	} else {
		sendScanFailEvent();
	}
});
client.on('error', function (error) {
	console.log('error:' + error);
	sendScanFailEvent();
});
client.on('close', function () {
	console.log('Connection closed');
});

iframe.onload = function () {
	iframe.contentWindow.addEventListener('scan', function (e) {
		console.dir(e);
		scan();
	}, false);
};
