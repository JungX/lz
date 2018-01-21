define([], function () {
	return ['$scope', '$state', 'ProductService', 'ConfirmService', 'AlertService', '$timeout', 'EditorService', ProductCtrl];

	function ProductCtrl($scope, $state, ProductService, ConfirmService, AlertService, $timeout, EditorService) {
		var id = $state.params.id;
		$scope.status = $state.params.status;
		var editor = EditorService.init('restful/product/add/image');
		$scope.photos = [];
		$scope.data = {
			create: !id
		};

		$scope.submit = function () {
			if (!!editor.$txt) {
				$scope.data.content = editor.$txt.html();
			}
			ProductService.save($scope.data).then(function (data) {
				AlertService.success('保存成功');
				ConfirmService.open('保存成功,是否继续编辑?').then(function () {
					$state.go('main.product.open', {id: data, status: $scope.status});
				}, function () {
					$state.go('main.product.list',{status: $scope.status});
				});
			});
		};

		$scope.onsale = function (id) {
			ConfirmService.open('确定上架?').then(function () {
				ProductService.onsale(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.unsale = function (id) {
			ConfirmService.open('确定下架?').then(function () {
				ProductService.unsale(id).then(function () {
					$state.reload();
				});
			});
		};

		$scope.exit = function () {
			$state.go('main.product.list',{status: $scope.status});
		};

		$scope.setCoverImage = function () {
			ProductService.setCoverImage(id, $scope.photos).then(function (data) {
				$scope.photos = [];
				$scope.data.coverImage = data;
			});
		};

		if (!!id) {
			editor.config.uploadParams = {
				id: id
			};
			ProductService.get(id).then(function (data) {
				$scope.data = data;
				$timeout(function () {
					editor.create();
					editor.$txt.html($scope.data.content);
				});
			});
		}
	}
});