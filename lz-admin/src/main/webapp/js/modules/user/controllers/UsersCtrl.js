define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'UserService', 'LEVELS', UsersCtrl];

	function UsersCtrl($scope, TableService, $state, ConfirmService, UserService, LEVELS) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10,
			query: {}
		};

		TableService.init($scope, 'user/list/paged', $scope.condition);


		$scope.enable = function (id) {
			ConfirmService.open('确定启用该用户?').then(function () {
				UserService.enable(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.disable = function (id) {
			ConfirmService.open('确定禁用该用户?').then(function () {
				UserService.disable(id).then(function () {
					$state.reload();
				});
			});
		};


		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				UserService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.open = function (id) {
			$state.go('main.user.open', {userType:$scope.userType,userId: id});
		};

		$scope.create = function () {
			$state.go('main.user.open', {userType:$scope.userType });
		};

		$scope.addPerson = function (id) {
			var type ='agent1';
			if($scope.userType === 'agent1'){
				type = 'agent2';
			}
			$state.go('main.user.open', {userType: type,upperId:id});
		};
	}
});