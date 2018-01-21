define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'ProductService', 'ModalService', 'AlertService', ProductListCtrl];

	function ProductListCtrl($scope, TableService, $state, ConfirmService, ProductService, ModalService, AlertService) {
		$scope.status = $state.params.status;
		$scope.condition = {
			and: true,
			start: 0,
			number: 10,
			query: {
				status: $scope.status
			}
		};

		TableService.init($scope, 'product/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				ProductService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.edit = function (id) {
			$state.go('main.product.open', {id: id,status:$scope.status});
		};

		$scope.create = function () {
			$state.go('main.product.open',{status:'unsale'});
		};
	}
});