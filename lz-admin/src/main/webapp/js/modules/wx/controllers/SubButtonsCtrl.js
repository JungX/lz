/**
 * Created by zhaoyang on 17/4/16.
 */
define(function () {
	return ['$scope', '$state', 'AlertService', 'ConfirmService', 'TableService', 'ButtonService', SubButtonsCtrl];
	function SubButtonsCtrl($scope, $state, AlertService, ConfirmService, TableService, ButtonService) {
		$scope.index1 = $state.params.index1;
		$scope.condition = {
			fields: ['name']
		};

		TableService.init($scope, 'weixin/ui/menu/button/list/' + $scope.index1, $scope.condition);

		$scope.create = function () {
			$state.go('main.wx.menu-button-create', {index1: $scope.index1});
		};

		$scope.edit = function (index2) {
			$state.go('main.wx.menu-button-edit', {index1: $scope.index1, index2: index2});
		};

		$scope.delete = function (index1, index2) {
			ConfirmService.open('确定删除?').then(function () {
				ButtonService.delete(index1, index2).success(function () {
					AlertService.success('删除成功');
					$state.reload();
				});
			});
		}
	}
});