define([], function () {
	return ['$scope', 'TableService', NotificationUsersSelectCtrl];

	function NotificationUsersSelectCtrl($scope, TableService) {
		var condition = {
			and: true,
			start: 0,
			number: 10,
			query: {
				status: 'normal'
			}
		};

		TableService.init($scope, 'user/list/paged', condition);

		$scope.search = function () {
			condition.and = true;
			condition.query = {
				username: $scope.query
			};
			TableService.display('user/list/paged', condition);
		};
	}
});