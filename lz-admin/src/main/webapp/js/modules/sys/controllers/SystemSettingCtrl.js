define([], function () {
	return ['$scope', '$state', 'SystemSettingService', 'ConfirmService', 'AlertService', SystemSettingCtrl];

	function SystemSettingCtrl($scope, $state, SystemSettingService, ConfirmService, AlertService) {
		$scope.data = {};
		SystemSettingService.get().then(function (data) {
			$scope.data = data;
		});

		$scope.submit = function () {
			SystemSettingService.save($scope.data).then(function () {
				AlertService.success('保存成功');
			});
		};
	}
});