/**
 * Created by zhaoyang on 17/4/16.
 */
define(function () {
	return ['$scope', '$state', 'AlertService', 'ButtonService', ButtonEditCtrl];
	function ButtonEditCtrl($scope, $state, AlertService, ButtonService) {
		$scope.types = ['click', 'view'];
		$scope.index1 = $state.params.index1;
		$scope.index2 = $state.params.index2;

		ButtonService.get($scope.index1, $scope.index2).then(function(data) {
			$scope.button = data;
		});

		$scope.submit = function () {
			if ('view' == $scope.button.type && !$scope.button.url) {
				AlertService.warning('类型为view时必须填写URL');
				return;
			}
			ButtonService.save($scope.index1, $scope.index2, $scope.button).then(function (data) {
				AlertService.success('保存成功');
				if ($scope.index2 == -1) {
					$state.go('menu');
				} else {
					$state.go('sub_buttons', {index1: $scope.index1});
				}
			})
		}
	}
});