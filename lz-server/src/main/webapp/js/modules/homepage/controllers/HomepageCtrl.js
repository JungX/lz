define([], function () {
	return ['$scope', '$state', '$location', '$timeout', '$interval', 'ConfirmService', 'Utils', 'UserService', 'ModalService', 'AlertService', 'PayService', 'WXService', HomepageCtrl];

	function HomepageCtrl($scope, $state, $location, $timeout, $interval, ConfirmService, Utils, UserService, ModalService, AlertService, PayService, WXService) {
		var deviceId = Utils.findGetParameter('deviceId');
		var type = Utils.findGetParameter('type');
		var notPayPledge = false;
		if (!deviceId) {
			AlertService.error('访问设备失败');
			$state.go('main.pay-fail');
			return;
		}
		var code = Utils.findGetParameter('code');
		if (!code) {
			WXService.oauth2('?deviceId=' + deviceId + '&type=' + type);
			return;
		}
		var openId;

		UserService.login({code: code}).then(function (data) {
			if (!!data && data.openId) {
				openId = data.openId;
			}
			if (data.code === 1) {
				setPhone();
			} else if (data.code === 2) {
				payPledge();
			} else if (date.code === 0) {
				notPayPledge = true;
			}
		});

		var setPhone = function () {
			ModalService.showModal({
				templateUrl: 'js/modules/homepage/templates/user.set.phone.html',
				inputs: {openId: openId},
				controller: function ($scope, close, openId) {
					$scope.data = {
						openId: openId
					};
					$scope.close = function () {
						close(false);
					};

					$scope.ok = function () {
						if (!$scope.data.phone) {
							AlertService.warning('请填写手机号码');
							return;
						}
						if (!$scope.data.code) {
							AlertService.warning('请填写验证码');
							return;
						}
						UserService.setPhone($scope.data).then(function () {
							close(true);
						});
					};

					$scope.sending = false;
					$scope.countdown = 60;
					$scope.send = function () {
						if ($scope.sending) {
							return;
						}
						sendSMS().then(function () {
							$scope.sending = true;
							var stoptime = $interval(function () {
								if (--$scope.countdown === 0) {
									$interval.cancel(stoptime);
									$scope.sending = false;
									$scope.countdown = 60;
								}
							}, 1000);
						});
					};

					var sendSMS = function () {
						if (!$scope.data.phone) {
							AlertService.error('请正确填写手机号码');
							return;
						}
						return UserService.sendCode($scope.data.phone);
					};
				}
			}).then(function (modal) {
				modal.close.then(function (result) {
					if (result) {
						payPledge();
					}
				});
			});
		};

		var payPledge = function () {
			ConfirmService.open('确认支付押金？', '支付500元').then(function () {
				var data = {
					orderType: 'pledge',
					openId: openId,
					deviceId: deviceId,
					productType: 'PLEDGE'
				};
				PayService.pay(data).then(function (data) {
					WXService.pay(data).then(function () {
						AlertService.success('支付成功');
						$state.go('main.homepage');
					}, function () {
						AlertService.error('支付失败');
						$state.go('main.pay-fail');
					});
				});
			}, function () {
				AlertService.error('支付失败');
				$state.go('main.pay-fail');
			});
		};

		$scope.pay = function (productType, money) {
			// if (!notPayPledge) {
			// 	payPledge();
			// }
			ConfirmService.open('确认开始打球？', '支付' + money + '元').then(function () {
				var data = {
					orderType: type,
					openId: openId,
					deviceId: deviceId,
					productType: productType
				};
				PayService.pay(data).then(function (data) {
					WXService.pay(data).then(function () {
						AlertService.success('支付成功');
						$state.go('main.pay-success');
					}, function () {
						AlertService.error('支付失败');
						$state.go('main.pay-fail');
					});
				});
			});
		};
	}
});