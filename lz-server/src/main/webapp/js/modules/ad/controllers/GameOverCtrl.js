define([], function () {
	return ['$scope', '$state', '$interval', GameOverCtrl];

	function GameOverCtrl($scope, $state, $interval) {
		var maxtime = 5 * 60;
		var timer, minutes, seconds;
		$scope.msg = "05:00";
		$scope.scanFail = false;
		$scope.buttonText = "确认归还球具";
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

		$scope.scanning = false;
		$scope.scan = function () {
			if ($scope.scanning) {
				return;
			}
			$scope.scanning = true;
			var event = new Event('scan');
			window.dispatchEvent(event);
			$scope.buttonText = "正在检测球具...";
		};

		window.addEventListener('scan-fail', function () {
			$scope.buttonText = "球具仍未归还";
			$scope.scanFail = true;
			$scope.scanning = false;
		}, false);
	}
});