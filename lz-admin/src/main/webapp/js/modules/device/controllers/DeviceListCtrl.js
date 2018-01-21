define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'DeviceService', 'ModalService', 'AlertService', DeviceListCtrl];

	function DeviceListCtrl($scope, TableService, $state, ConfirmService, DeviceService, ModalService, AlertService) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10
		};

		TableService.init($scope, 'device/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				DeviceService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.edit = function (id) {
			$state.go('main.device.open.base', {deviceId: id});
		};

		$scope.create = function () {
			$state.go('main.device.open.base');
		};
	}
});