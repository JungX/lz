define([], function () {
	return ['$scope', '$state', 'AdminService', 'ConfirmService', 'AlertService', AdminCtrl];

	function AdminCtrl($scope, $state, AdminService, ConfirmService, AlertService) {
		var id = $state.params.id;
		$scope.data = {
			create: !id,
			modules: []
		};

		if (!!id) {
			AdminService.get(id).then(function (data) {
				$scope.data = data;
			});
		}

		$scope.modules = [{
			id: 'channel', name: '频道管理'
		}, {
			id: 'video', name: '视频管理'
		}, {
			id: 'user', name: '用户管理'
		}, {
			id: 'stats', name: '统计管理'
		}];

		$scope.exit = function () {
			$state.go('main.sys.admins');
		};

		$scope.existsModule = function (module) {
			return $scope.data.modules.indexOf(module) > -1;
		};

		$scope.toggleModule = function (module) {
			var idx = $scope.data.modules.indexOf(module);
			if (idx > -1) {
				$scope.data.modules.splice(idx, 1);
			} else {
				$scope.data.modules.push(module);
			}
		};

		$scope.submit = function () {
			var result = null;
			if ($scope.data.create) {
				result = AdminService.create($scope.data);
			} else {
				result = AdminService.save($scope.data);
			}
			result.then(function (data) {
				AlertService.success('保存成功');
				ConfirmService.open('保存成功,是否继续编辑?').then(function () {
					$state.go('main.sys.admin', {id: data});
				}, function () {
					$state.go('main.sys.admins');
				});
			});
		};
	}
});