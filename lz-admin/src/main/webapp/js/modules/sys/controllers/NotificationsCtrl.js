define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'NotificationService',  NotificationsCtrl];

	function NotificationsCtrl($scope, TableService, $state, ConfirmService, NotificationService) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10
		};
		
		
		TableService.init($scope, 'notification/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				NotificationService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.edit = function (id) {
			$state.go('main.sys.notification', {id: id});
		};

		$scope.create = function () {
			$state.go('main.sys.notification');
		};
	}
});