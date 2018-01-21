define([], function () {
	return ['$scope', 'Utils', '$interval', GameContinueCtrl];

	function GameContinueCtrl($scope, Utils, $interval) {
		$scope.deviceId = Utils.findGetParameter('deviceId');
		var maxtime = 5 * 60;
		var timer, minutes, seconds;
		$scope.msg = "05:00";
		$scope.scanFail = false;
		$scope.buttonText = "不续费了";
		var CountDown = function () {
			if (maxtime >= 0) {
				minutes = Math.floor(maxtime / 60);
				seconds = Math.floor(maxtime % 60);
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				$scope.msg = "0" + minutes + ":" + seconds;
				--maxtime;
			}
			else {
				clearInterval(timer);
			}
		};
		timer = $interval(CountDown, 1000);

		$scope.closeWindow = function () {
			var event = new Event('close-window');
			window.dispatchEvent(event);
		};
	}
});