define(function () {
	return ['BannersService', channelBanners];
	function channelBanners(BannersService) {
		return {
			restrict: 'E',
			scope: {
				channelId: "="
			},
			templateUrl: 'js/modules/homepage/templates/banners.html',
			link: function ($scope) {
				BannersService.get($scope.channelId).then(function (data) {
					$scope.banners = _.values(data.banners);
				});
			}
		};
	}
});