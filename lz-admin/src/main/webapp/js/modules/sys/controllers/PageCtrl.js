define([], function () {
	return ['$scope', '$state', 'PageService', 'ConfirmService', 'AlertService', '$timeout', 'EditorService', PageCtrl];

	function PageCtrl($scope, $state, PageService, ConfirmService, AlertService, $timeout, EditorService) {
		var id = $state.params.id;
		var editor = EditorService.init('restful/page/add/image');
		$scope.data = {
			create: !id
		};

		$scope.submit = function () {
			if(!!editor.$txt) {
				$scope.data.content = editor.$txt.html();
			}
			PageService.save($scope.data).then(function (data) {
				AlertService.success('保存成功');
				ConfirmService.open('保存成功,是否继续编辑?').then(function () {
					$state.go('main.sys.page', {id: data});
				}, function () {
					$state.go('main.sys.pages');
				});
			});
		};

		$scope.exit = function () {
			$state.go('main.sys.pages');
		};

		if (!!id) {
			editor.config.uploadParams = {
				id: id
			};
			PageService.get(id).then(function (data) {
				$scope.data = data;
				$timeout(function () {
					editor.create();
					editor.$txt.html($scope.data.content);
				});
			});

		}
	}
});