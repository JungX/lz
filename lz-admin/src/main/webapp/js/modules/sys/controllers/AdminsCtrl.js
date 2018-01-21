define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'AdminService', 'AlertService', AdminsCtrl];

	function AdminsCtrl($scope, TableService, $state, ConfirmService, AdminService, AlertService) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10
		};

		TableService.init($scope, 'admin/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				AdminService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.edit = function (data) {
			$state.go('main.sys.admin', {id: data.id});
		};

		$scope.create = function () {
			$state.go('main.sys.admin');
		};
	}
});