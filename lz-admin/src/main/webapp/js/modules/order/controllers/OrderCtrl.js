define([], function () {
	return ['$scope', '$state', 'ConfirmService', 'HttpFileService', 'OrderService', 'LEVELS', 'UserService', OrderCtrl];

	function OrderCtrl($scope, $state, ConfirmService, HttpFileService, OrderService, LEVELS, UserService) {
		var id = $state.params.id;
		$scope.levels = LEVELS;
		if (!!id) {
			OrderService.get(id).then(function (data) {
				$scope.order = data;
				UserService.get(data.userId).then(function (data) {
					$scope.user = data;
					console.dir(data)
				})
			});
		}

		$scope.exit = function () {
			$state.go('main.order.orders')
		};

		$scope.pay = function () {
			ConfirmService.open('确定变更该订单状态为已付款?').then(function () {
				OrderService.pay($scope.order.id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.download = function () {
			HttpFileService.download('restful/order/export/' + id, {filename: $scope.order.number + '.pdf'});
		};
	}
});