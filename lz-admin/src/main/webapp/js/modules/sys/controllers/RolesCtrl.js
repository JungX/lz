define([], function () {
	return ['$scope', '$state', 'BannerService', 'ConfirmService', 'AlertService', RolesCtrl];

	function RolesCtrl($scope, $state, BannerService, ConfirmService, AlertService) {
		var id = $state.params.id;
		var setId = $state.params.setId;
		$scope.types = [
			{id: 'channel', text: '频道'},
			{id: 'product', text: '商品'}
		];

		$scope.data = {
			create: !id
		};

		if (!!id) {
			BannerService.get(id).then(function (data) {
				$scope.data = data;
			});
		}

		$scope.submit = function () {
			BannerService.save(setId, $scope.data).then(function (data) {
				AlertService.success('保存成功');
				$state.go('main.sys.banner-edit', {setId: setId, id: data});
			});
		};

		$scope.exit = function () {
			$state.go('main.sys.banners');
		};

		$scope.uploadImage = function () {
			BannerService.addImage(id, $scope.photos).then(function (data) {
				$scope.photos = [];
				$scope.data.image = data;
			});
		};

		$scope.removeImage = function () {
			ConfirmService.open('确定删除?').then(function () {
				BannerService.removeImage($scope.data.id, $scope.data.image).then(function () {
					$scope.photos = [];
					$scope.data.image = undefined;
				});
			});
		};
	}
});