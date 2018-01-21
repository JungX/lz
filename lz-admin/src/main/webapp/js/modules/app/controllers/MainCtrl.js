define([], function () {
	return ['$scope', '$rootScope', '$location', 'AlertService', '$state', '$http', 'ModalService', 'RestService', 'AdminService', MainCtrl];

	function MainCtrl($scope, $rootScope, $location, AlertService, $state, $http, ModalService, RestService, AdminService) {

		AdminService.current().then(function (data) {
			$rootScope.currentuser = data;
		});

		$scope.isActive = function (location) {
			return ($location.path().indexOf(location)) == 0;
		};

		$scope.isAuth = function (module) {
			if (!$rootScope.currentuser) {
				return false;
			} else {
				return $rootScope.currentuser.master === true || $rootScope.currentuser.modules.indexOf(module) > -1;
			}
		};

		$rootScope.$on('unauth', function () {
			$state.go('login')
		});

		$scope.logout = function () {
			$http.post('auth/logout', $scope.data).success(function () {
				sessionStorage.removeItem("token");
				$state.go('login');
			});
		};


		$scope.logout = function () {
			$http.post('auth/logout', $scope.data).success(function () {
				sessionStorage.removeItem("token");
				$state.go('login');
			});
		};

		$scope.changePass = function () {
			ModalService.showModal({
				templateUrl: "js/modules/app/templates/password.html",
				controller: function ($scope, close) {
					$scope.data = {};
					$scope.ok = function () {
						if (!$scope.data.oldPassword || !$scope.data.newPassword || !$scope.data.reNewPassword) {
							AlertService.warning('请完整填写信息');
							return;
						}
						if ($scope.data.newPassword !== $scope.data.reNewPassword) {
							AlertService.warning('确认密码不匹配');
							return;
						}
						RestService.post('admin/mp', $scope.data).then(function () {
							AlertService.success('密码修改成功');
							close();
						});
					};
					$scope.cancel = function () {
						close();
					};
				}
			});
		};

	}
});