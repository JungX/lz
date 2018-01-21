const lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('config.ini')
});
lineReader.on('line', function (line) {
	if (line.indexOf('deviceId') !== -1) {
		let lineArr = line.split('=');
		let deviceId = lineArr[1];
		document.getElementById("adIframe").src = "http://www.lz365golf.com/server/ad?deviceId=" + deviceId;
		// document.getElementById("adIframe").src = "http://localhost:8083/ad?deviceId=" + deviceId;
	}
});
