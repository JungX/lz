define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'ShopService', ShopsCtrl];

	function ShopsCtrl($scope, TableService, $state, ConfirmService, ShopService) {
		$scope.condition = {
            and: true,
            start: 0,
            number: 10,
            sortField:'createdTime',
            sortDesc:true
		};

		TableService.init($scope, 'shop/list/paged', $scope.condition);
		$scope.enable = function (id) {
			ConfirmService.open('确定启用该店铺?').then(function () {
				ShopService.enable(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.disable = function (id) {
			ConfirmService.open('确定禁用该店铺?').then(function () {
				ShopService.disable(id).then(function () {
					$state.reload();
				});
			});
		};


		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				ShopService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.open = function (id) {
			$state.go('main.shop.open.base', {shopId: id});
		};

		$scope.create = function () {
			$state.go('main.shop.open.base');
		};

	}
});