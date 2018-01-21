define([], function () {
	return ['$scope', '$rootScope', '$http', '$state', 'AlertService', LoginCtrl];

	function LoginCtrl($scope, $rootScope, $http, $state, AlertService) {
		$scope.submit = function () {
			$http.post('auth/login', $scope.data).success(function (result) {
				if (result.resultType == 'SUCCESS') {
					sessionStorage.setItem("token", result.result.token);
					$http.post('restful/admin/current').success(function (data) {
						$rootScope.currentuser = data.result;
						$state.go('main');
					});
				} else {
					AlertService.warning('用户名或密码不正确');
				}
			});
		}
	}
});