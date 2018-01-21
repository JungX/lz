define([], function () {
	return ['$scope', '$http', '$state', 'AlertService', 'Loading', LoginCtrl];

	function LoginCtrl($scope, $http, $state, AlertService, Loading) {
		var phone = $state.params.phone;
		$scope.data = {
			username: phone
		};
		$scope.submit = function () {
			$http.post('auth/login', $scope.data).success(function (result) {
				if (result.resultType == 'SUCCESS') {
					localStorage.setItem("token", result.result.token);
					$state.go('main.homepage');
				} else {
					AlertService.warning('用户名或密码不正确');
				}
			}, function (err) {
				console.dir(err);
			});
		};

		$scope.back = function () {
			$state.go('main.homepage');
		}
	}
});