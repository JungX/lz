define([], function () {
	return ['$scope', '$state', 'BannersService', 'BannerService', 'AlertService', 'ConfirmService', BannersCtrl];
	function BannersCtrl($scope, $state, BannersService, BannerService, AlertService, ConfirmService) {
		var load = function () {
			BannersService.getHomepage().then(function (data) {
				$scope.bannerSet = data;
			});
		};
		load();

		$scope.create = function () {
			$state.go('main.sys.banner-create', {setId: $scope.bannerSet.id});
		};

		$scope.edit = function (id) {
			$state.go('main.sys.banner-edit', {setId: $scope.bannerSet.id, id: id});
		};

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				BannerService.delete($scope.bannerSet.id, id).then(function () {
					AlertService.success('删除成功');
					load();
				});
			});
		}
	}
});