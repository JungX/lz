define([], function () {
	return ['$scope', '$state', 'DeviceService', 'ShopService', 'AlertService', '$timeout', 'ProvinceService', DeviceBaseCtrl];

	function DeviceBaseCtrl($scope, $state, DeviceService, ShopService, AlertService, $timeout, ProvinceService) {
		var id = $state.params.deviceId;
		$scope.data = {
			create: !id
		};

		ProvinceService.provinces().then(function (data) {
			$scope.provinces = data;
		});

		$scope.selectedProvince = function () {
			if (!!$scope.province) {
				ShopService.listByProvince($scope.province).then(function (data) {
					$scope.shops = data;
				});
			}
		};

		$scope.submit = function () {
			if (!!$scope.shop) {
				$scope.data.shopId = $scope.shop.id;
			}
			DeviceService.save($scope.data).then(function (data) {
				AlertService.success('保存成功');
				$state.go('main.device.list');
			});
		};

		$scope.exit = function () {
			$state.go('main.device.list');
		};

		if (!!id) {
			DeviceService.get(id).then(function (data) {
				if (!!data.shop) {
					$scope.shop = data.shop;
					$scope.province = data.shop.province;
					$scope.selectedProvince();
				}
				$scope.data = data;
			});
		}
	}
});