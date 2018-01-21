define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'TagsService', 'ModalService', 'AlertService', TagsCtrl];

	function TagsCtrl($scope, TableService, $state, ConfirmService, TagsService, ModalService, AlertService) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10,
			query: {
				status: $scope.status
			}
		};

		TableService.init($scope, 'tag/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				TagsService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.create = function (data) {
			ModalService.showModal({
				templateUrl: "js/modules/sys/templates/tag.html",
				inputs: {
					data: data
				},
				controller: function ($scope, close, data, TagsService) {
					$scope.data = data;
					$scope.ok = function () {
						TagsService.save($scope.data).then(function () {
							close(true);
						});
					};
					$scope.cancel = function () {
						close();
					};
				}
			}).then(function (modal) {
				modal.close.then(function (result) {
					if (result) {
						AlertService.success('添加成功');
						$state.reload();
					}
				});
			});
		};
	}
});