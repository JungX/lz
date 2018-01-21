define([], function () {
	return ['$scope', '$state', 'Utils', '$timeout', 'DeviceService', AdCtrl];

	function AdCtrl($scope, $state, Utils, $timeout, DeviceService) {
		var deviceId = Utils.findGetParameter('deviceId');

		DeviceService.listAdImages().then(function (data) {
			$timeout(function () {
				$scope.images = data;
			}, 3000);
		});

		$scope.gotoCode = function () {
			$state.go('code', {deviceId: deviceId});
		};
	}
});