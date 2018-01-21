/**
 * Created by zhaoyang on 17/4/16.
 */
define(function () {
	return ['$scope', '$state', 'AlertService', 'ButtonService', ButtonCreateCtrl];

	function ButtonCreateCtrl($scope, $state, AlertService, ButtonService) {
		$scope.types = ['click', 'view'];
		$scope.index1 = $state.params.index1;
		$scope.submit = function () {
			if ('view' == $scope.button.type && !$scope.button.url) {
				AlertService.warning('类型为view时必须填写URL');
				return;
			}
			ButtonService.create($scope.index1, $scope.button).then(function () {
				AlertService.success('保存成功');
				if ($scope.index1 == -1) {
					$state.go('main.wx.menu');
				} else {
					$state.go('main.wx.menu-sub-buttons', {index1: $scope.index1});
				}
			})
		}
	}
});