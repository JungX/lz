define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'PageService', 'ModalService', 'AlertService', PagesCtrl];

	function PagesCtrl($scope, TableService, $state, ConfirmService, PageService, ModalService, AlertService) {
		$scope.condition = {
			and: true,
			start: 0,
			number: 10
		};

		TableService.init($scope, 'page/list/paged', $scope.condition);

		$scope.delete = function (id) {
			ConfirmService.open('确定删除?').then(function () {
				PageService.delete(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.edit = function (id) {
			$state.go('main.sys.page', {id: id});
		};

		$scope.create = function () {
			$state.go('main.sys.page');
		};
	}
});