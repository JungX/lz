define([], function () {
	return ['$scope', '$state', CodeCtrl];

	function CodeCtrl($scope, $state) {
		$scope.deviceId = $state.params.deviceId;
		setTimeout(function () {
			$state.go('homepage');
		}, 1000 * 60 * 0.5)
	}
});