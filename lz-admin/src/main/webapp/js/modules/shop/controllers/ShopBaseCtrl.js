define([], function () {
	return ['$scope', '$window', 'AlertService', '$state', 'ShopService', 'ProvinceService', ShopCtrl];

	function ShopCtrl($scope, $window, AlertService, $state, ShopService, ProvinceService) {
		var shopId = $state.params.shopId;
		$scope.data = {
			create: !shopId
		};
		$scope.selectedProvince = function () {
			if (!!$scope.data.province) {
				ProvinceService.cities($scope.data.province.code).then(function (data) {
					$scope.cities = data;
				});
			}
		};

		$scope.selectedCity = function () {
			if (!!$scope.data.city) {
				ProvinceService.areas($scope.data.city.code).then(function (data) {
					$scope.areas = data;
				});
			}
		};

		ProvinceService.provinces().then(function (data) {
			$scope.provinces = data;
		});

		if (!$scope.data.create) {
			ShopService.get(shopId).then(function (data) {
				$scope.data = data;
				$scope.selectedProvince();
				$scope.selectedCity();
			});
		}

		$scope.submit = function () {
			ShopService.save($scope.data).then(function (data) {
				AlertService.success('保存成功');
				$scope.exit();
			});
		};

		$scope.exit = function () {
			$window.history.back();
		};

		$scope.setCoverImage = function () {
			ShopService.setCoverImage(shopId, $scope.photos).then(function (data) {
				$scope.photos = [];
				$scope.data.coverImage = data;
			});
		};

	}
});