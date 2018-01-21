define([], function () {
	return ['$scope', '$state', DeviceCtrl];

	function DeviceCtrl($scope, $state) {
		$scope.deviceId = $state.params.deviceId;
		$scope.tabIndex = !!$state.current.data ? $state.current.data.selectedTab : 0;
	}
});