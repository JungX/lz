define([], function () {
	return ['$scope', 'TableService', '$state', 'ConfirmService', 'PageService', 'ModalService', 'AlertService', UserLevelConfigsCtrl];

	function UserLevelConfigsCtrl($scope, TableService, $state, ConfirmService, PageService, ModalService, AlertService) {

		$scope.levels = [{
			id: 0, text: '一般用户'
		}, {
			id: 1, text: '银卡会员'
		}, {
			id: 2, text: '金卡会员'
		}, {
			id: 3, text: '钻石卡会员'
		}];

		$scope.condition = {
			and: true,
			start: 0,
			number: 10
		};

		TableService.init($scope, 'ulc/list/paged', $scope.condition);

		$scope.edit = function (id) {
			$state.go('main.sys.userLevel', {id: id});
		};

		$scope.create = function () {
			$state.go('main.sys.userLevel');
		};
	}
});