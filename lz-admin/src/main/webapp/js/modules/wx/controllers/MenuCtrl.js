/**
 * Created by zhaoyang on 17/4/16.
 */
define(function () {
	return ['$scope', '$state', 'AlertService', 'ConfirmService', 'TableService', 'MenuService', MenuCtrl];
	function MenuCtrl($scope, $state, AlertService, ConfirmService, TableService, MenuService) {

		$scope.condition = {
			fields: ['name']
		};

		TableService.init($scope, 'weixin/ui/menu/button/list/-1', $scope.condition);

		$scope.download = function () {
			ConfirmService.open("确定下载最新的菜单？下载将会覆盖本地所有菜单内容.").then(function () {
				MenuService.download().then(function () {
					AlertService.success('下载成功');
					$state.reload();
				});
			});
		};

		$scope.upload = function () {
			ConfirmService.open("确定上传最新的菜单？上传后将会覆盖微信端所有菜单内容.").then(function () {
				MenuService.upload().then(function () {
					AlertService.success('上传成功');
					$state.reload();
				});
			});
		};

		$scope.delete = function (index1, index2) {
			ConfirmService.open("确定删除？").then(function () {
				MenuService.delete('menu/button/delete/' + index1 + '/' + index2).success(function () {
					AlertService.success('删除成功');
					$state.reload();
				});
			});
		};

		$scope.create = function () {
			$state.go('main.wx.menu-button-create', {index1: '-1'});
		};

		$scope.edit = function (index1, index2) {
			$state.go('main.wx.menu-button-edit', {index1: index1, index2: index2});
		};

		$scope.subs = function(index1) {
			$state.go('main.wx.menu-sub-buttons', {index1: index1});
		};
	}
});