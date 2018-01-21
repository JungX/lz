define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'OrderService', 'LEVELS', OrdersCtrl];

	function OrdersCtrl($scope, TableService, $state, ConfirmService, OrderService, LEVELS) {
		$scope.status = {
			'unpaid': '未付款',
			'paid': '已付款',
			'finish': '已完成'
		};
		$scope.type = {
			game: '游戏',
			pledge: '押金'
		};
		$scope.levels = LEVELS;
		$scope.condition = {
			and: true,
			start: 0,
			number: 10,
			sortField: 'createdTime',
			sortDesc: true
		};

		TableService.init($scope, 'order/list/paged', $scope.condition);

		$scope.open = function (id) {
			$state.go('main.order.open', {id: id});
		};
	}
});