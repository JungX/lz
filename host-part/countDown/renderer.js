const iframe = document.getElementById("iframe");
const lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('config.ini')
});
lineReader.on('line', function (line) {
	if (line.indexOf('deviceId') !== -1) {
		const lineArr = line.split('=');
		let deviceId = lineArr[1];
		iframe.src = 'http://www.lz365golf.com/server/ad?deviceId=' + deviceId + '#/game-continue';
	}
});
const net = require('net');
const port = 9207;
const host = '127.0.0.1';
const client = new net.Socket();
client.setEncoding('utf-8');

setTimeout(function () {
	iframe.contentWindow.addEventListener('close-window', function (e) {
		client.connect(port, host);
		client.write('countdown', function (data) {
			window.close();
		});
	}, false);
}, 2000);
