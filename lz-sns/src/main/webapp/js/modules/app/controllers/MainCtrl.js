define([], function () {
	return ['$scope', '$state', '$http', '$rootScope', 'UserService', 'Utils', 'WXService', MainCtrl];

	function MainCtrl($scope, $state, $http, $rootScope, UserService, Utils, WXService) {
		$scope.data = {};
		var code = Utils.findGetParameter('code');
		if (!code) {
			WXService.oauth2('#/main');
		}
		$scope.submit = function () {
			$http.post('auth/login', $scope.data).success(function (result) {
				if (result.resultType == 'SUCCESS') {
					localStorage.setItem("token", result.result.token);
					UserService.getCurrent().then(function (data) {
						$rootScope.currentUser = data;
					});
				}
			}, function (err) {
				console.dir(err);
			});
		};

		if (!!code) {
			$scope.data.wxCode = code;
			$scope.submit();
		}

		$scope.wallet = function () {
			$state.go('wallet');
		};

		$scope.orders = function () {
			$state.go('orders');
		};
	}
});