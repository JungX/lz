define([], function () {
	return ['$scope', '$window', 'AlertService', '$state', 'UserService', 'TableService', 'ConfirmService', UserCtrl];

	function UserCtrl($scope, $window, AlertService, $state, UserService, TableService, ConfirmService) {
		var userId = $state.params.userId;
		var upperId = $state.params.upperId;
		$scope.userType = $state.params.userType;
		$scope.data = {
			create: !userId,
			userType: $scope.userType,
			referrer: upperId
		};

		$scope.userTypes = [
			{id: 'user', text: '用户'},
			{id: 'staff', text: '员工'},
			{id: 'agent1', text: '一级代理'},
			{id: 'agent2', text: '二级代理'}
		];


		if (!!userId) {
			UserService.get(userId).then(function (data) {
				$scope.data = data;
			});

			$scope.condition = {
				and: true,
				start: 0,
				number: 10,
				query: {
					referrer: userId
				}
			};

			TableService.init($scope, 'user/list/paged', $scope.condition);
		}

		if (!!upperId || $scope.data.referrer) {
			UserService.get(upperId ? upperId : $scope.data.referrer).then(function (data) {
				$scope.upper = data;
			});
		}

		$scope.getUserTypes = function (type) {
			if (type === 'staff') {
				return '员工';
			} else if (type === 'agent1') {
				return '一级代理';
			} else if (type === 'agent2') {
				return '二级代理';
			}
		};

		$scope.submit = function () {
			UserService.save($scope.data).then(function (data) {
				AlertService.success('保存成功');
				$scope.exit();
			});
		};

		$scope.exit = function () {
			$window.history.back();
		};

		$scope.isDisplay = function () {
			if ($scope.data.referrer || $scope.upper) {
				return true;
			}
			return false;
		};

		$scope.upperName = function () {
			return $scope.upper.nickname;
		};

		$scope.ask = function () {
			ConfirmService.open('确定邀请该用户成为合伙人？').then(function () {
				UserService.ask($scope.data.id).then(function () {
					AlertService.success('邀请已发送');
				});
			});
		};
	}
});