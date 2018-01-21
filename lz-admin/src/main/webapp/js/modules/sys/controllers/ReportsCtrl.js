define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'ReportService', 'ModalService', 'AlertService', ReportsCtrl];

	function ReportsCtrl($scope, TableService, $state, ConfirmService, ReportService, ModalService, AlertService) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10
		};

		TableService.init($scope, 'report/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				ReportService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.edit = function (id) {
			$state.go('main.sys.report', {id: id});
		};

	}
});