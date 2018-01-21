define([], function () {
	return ['$scope', '$state', 'NotificationService', 'ModalService', 'AlertService', 'TableService', NotificationCtrl];

	function NotificationCtrl($scope, $state, NotificationService, ModalService, AlertService, TableService) {
		var id = $state.params.id;
		$scope.data = {
			create: !id,
			allUser: false
		};
		$scope.type = "1";

		$scope.indexes = [];
		$scope.datas = [];
		var tableService = TableService;

		$scope.$watch('datas', function () {
			console.dir($scope.datas);
		}, true);

		if (!!id) {
			NotificationService.get(id).then(function (data) {
				if (data.allUser) {
					$scope.type = "0";
				}
				$scope.data = data;
				$scope.indexes = data.userIds;
			});
		}


		$scope.submit = function () {
			if (!$scope.data.allUser) {
				$scope.data.userIds = $scope.indexes;
			}
			NotificationService.save($scope.data).then(function () {
				AlertService.success('保存成功');
				$state.go('main.sys.notifications');
			});
		};

		$scope.selectAction = function () {
			if ($scope.type == '0') {
				$scope.data.allUser = true;
			} else {
				$scope.data.allUser = false;
			}
		};

		$scope.exit = function () {
			$state.go('main.sys.notifications');
		};

		var condition = {
			start: 0,
			params: {
				ids: $scope.indexes
			}
		};
		tableService.init($scope, 'user/list/paged', condition, true);
		$scope.$watch('indexes', function () {
			if ($scope.indexes.length > 0) {
				condition.params.ids = $scope.indexes;
				tableService.display('user/list/paged', condition, $scope);
			} else {
				$scope.datas = [];
			}
		}, true);

		$scope.deleteUser = function (userId) {
			var idx = $scope.indexes.indexOf(userId);
			if (idx > -1) {
				$scope.indexes.splice(idx, 1);
			}
		};

		$scope.selectUser = function () {
			ModalService.showModal({
				templateUrl: "js/modules/sys/templates/notification.users.select.html",
				controller: function ($scope, close) {
					$scope.selected = [];
					$scope.ok = function () {
						if ($scope.selected.length > 0) {
							close($scope.selected);
						}
					};
					$scope.cancel = function () {
						close();
					};
					$scope.toggleSelect = function (id) {
						var index = $scope.selected.indexOf(id);
						if (index > -1) {
							$scope.selected.splice(index, 1);
						} else {
							$scope.selected.push(id);
						}
					};
					$scope.existSelected = function (id) {
						return $scope.selected.indexOf(id) > -1;
					};
				}
			}).then(function (modal) {
				modal.close.then(function (selected) {
					if (!!selected) {
						var _indexes = $scope.indexes;
						for (var i in selected) {
							var userId = selected[i];
							var idx = _indexes.indexOf(userId);
							if (idx === -1) {
								_indexes.push(userId);
							}
						}
						$scope.indexes = _indexes;
					}
				});
			});
		};
	}
});