define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'DevAdImageService', DevAdImagesCtrl];

	function DevAdImagesCtrl($scope, TableService, $state, ConfirmService, DevAdImageService) {
		$scope.photos = [];

		$scope.condition = {
			and: true,
			start: 0,
			number: 10,
			sortField: 'createdTime',
			sortDesc: true
		};

		TableService.init($scope, 'device/ad/image/list/paged', $scope.condition);

		$scope.open = function (id) {
			$state.go('main.order.open', {id: id});
		};

		$scope.delete = function (id) {
			ConfirmService.open("确定删除？").then(function () {
				DevAdImageService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.upload = function () {
			DevAdImageService.add($scope.photos).then(function () {
				$scope.photos = [];
				$state.reload();
			});
		}
	}
});