define([], function () {
	return ['$scope', 'UserService', '$state', 'AlertService', '$timeout', '$interval', ForgetCtrl];

	function ForgetCtrl($scope, UserService, $state, AlertService, $timeout, $interval) {
		$scope.data = {
			create: true
		};
		$scope.modify = function () {
			if (!$scope.data.phone) {
				AlertService.warning('请填写手机号码');
				return;
			}
			if (!$scope.data.password) {
				AlertService.warning('请填写新密码');
				return;
			}
			if (!$scope.data.rePassword) {
				AlertService.warning('请填写确认密码');
				return;
			}
			if ($scope.data.password !== $scope.data.rePassword) {
				AlertService.warning('确认密码不正确');
				return;
			}
			if (!$scope.code) {
				AlertService.warning('请填写验证码');
				return;
			}
			UserService.forgetPWD($scope.code, $scope.data).then(function () {
				AlertService.success('密码修改成功');
				$timeout(function () {
					$state.go('login', {phone: $scope.data.phone});
				}, 2000);
			});
		};

		$scope.sending = false;
		$scope.countdown = 60;
		$scope.send = function () {
			if ($scope.sending) {
				return;
			} else {
				sendSMS().then(function () {
					$scope.sending = true;
					var stoptime = $interval(function () {
						if (--$scope.countdown === 0) {
							$interval.cancel(stoptime);
							$scope.sending = false;
						}
					}, 1000);
				});
			}
		};

		var sendSMS = function () {
			if (!$scope.data.phone) {
				AlertService.error('请正确填写手机号码');
				return;
			}
			return UserService.sendCode($scope.data.phone);
		};
	}
});