define([], function () {
	return ['$scope', '$state', 'BannerService', 'ConfirmService', 'AlertService', 'ChannelSelectService', 'ChannelService', 'PageSelectService', 'PageService', BannerCtrl];

	function BannerCtrl($scope, $state, BannerService, ConfirmService, AlertService, ChannelSelectService, ChannelService, PageSelectService, PageService) {
		var id = $state.params.id;
		var setId = $state.params.setId;
		$scope.types = [
			{id: 'news', text: '新闻'},
			{id: 'page', text: '广告页面'},
			{id: 'link', text: '链接'}
		];

		$scope.data = {
			create: !id
		};
		$scope.typeText = null;
		$scope.targetText = null;

		$scope.$watch('data.type', function () {
			if (!!$scope.data.type) {
				$scope.typeText = _.find($scope.types, {id: $scope.data.type}).text;
				$scope.targetText = null;
				$scope.data.targetId = null;
			}
		});

		if (!!id) {
			BannerService.get(id).then(function (data) {
				$scope.data = data;
				if ($scope.data.type === 'channel' && !!$scope.data.targetId) {
					ChannelService.get($scope.data.targetId).then(function (data) {
						$scope.targetText = data.title;
					})
				} else if ($scope.data.type === 'page' && !!$scope.data.targetId) {
					PageService.get($scope.data.targetId).then(function (data) {
						$scope.targetText = data.title;
					})
				}
			});
		}

		$scope.submit = function () {
			BannerService.save(setId, $scope.data).then(function (data) {
				AlertService.success('保存成功');
				$state.go('main.sys.banner-edit', {setId: setId, id: data});
			});
		};

		$scope.exit = function () {
			$state.go('main.sys.banners');
		};

		$scope.uploadImage = function () {
			BannerService.addImage(id, $scope.photos).then(function (data) {
				$scope.photos = [];
				$scope.data.image = data;
			});
		};

		$scope.removeImage = function () {
			ConfirmService.open('确定删除?').then(function () {
				BannerService.removeImage($scope.data.id, $scope.data.image).then(function () {
					$scope.photos = [];
					$scope.data.image = undefined;
				});
			});
		};

		$scope.select = function () {
			var service = null;
			if ($scope.data.type === 'channel') {
				service = ChannelSelectService;
			} else if ($scope.data.type === 'page') {
				service = PageSelectService;
			}
			if (!!service) {
				service.open().then(function (data) {
					$scope.data.targetId = data.id;
					if ($scope.data.type === 'channel' || $scope.data.type === 'page') {
						$scope.targetText = data.title;
					}
				});
			}
		};
	}
});