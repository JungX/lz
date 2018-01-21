define([], function () {
	return ['$scope', '$state', 'ShopService', '$timeout', 'WXService', ShopCtrl];

	function ShopCtrl($scope, $state, ShopService, $timeout, WXService) {
		var shopId = $state.params.shopId;
		ShopService.get(shopId).then(function (data) {
			$scope.data = data;
		});

		$scope.openMap = function () {
			var lat = $scope.data.coordinates[1];
			var lng = $scope.data.coordinates[0];
			WXService.openMap(lat, lng, $scope.data.name, $scope.data.address);
		}
	}
});