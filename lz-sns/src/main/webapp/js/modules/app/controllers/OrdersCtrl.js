define([], function () {
	return ['$scope', '$state', '$http', '$rootScope', 'AccountService', 'Utils', OrdersCtrl];

	function OrdersCtrl($scope, $state, $http, $rootScope, AccountService, Utils) {

		$scope.orderTypes = {
			game: '开始游戏',
			continueGame: '继续游戏',
			pledge: '押金'
		};

		var condition = {
			start: 0,
			number: 20,
			sortField: 'createdTime',
			sortDesc: true,
			total: -1
		};

		$scope.datasLoading = false;
		$scope.datasFinished = false;
		$scope.datas = [];
		$scope.listDatas = function () {
			if ($scope.datasLoading || $scope.datasFinished) {
				return;
			}
			$scope.datasLoading = true;
			AccountService.orders(condition).then(function (result) {
				condition.start = condition.start + result.values.length;
				if (condition.total === -1) {
					condition.total = result.total;
				}
				for (var i in result.values) {
					$scope.datas.push(result.values[i]);
				}
				$scope.datasLoading = false;
				$scope.datasFinished = condition.total === condition.start;
			});
		};
	}
});