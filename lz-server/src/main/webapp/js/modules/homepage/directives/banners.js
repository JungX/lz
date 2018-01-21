define(function () {
	return ['BannersService', 'ChannelService', '$state', banners];
	function banners(BannersService, ChannelService, $state) {
		return {
			restrict: 'E',
			scope: true,
			templateUrl: 'js/modules/homepage/templates/banners.html',
			link: function ($scope) {
				BannersService.getHomepage().then(function (data) {
					$scope.banners = _.values(data.banners);
				});

				$scope.open = function (banner) {
					if (banner.type === 'page') {
						$state.go('page', {id: banner.targetId});
					} else if (banner.type === 'channel') {
						ChannelService.get(banner.targetId).then(function (data) {
							openChannel(data);
						});
					} else if (banner.type === 'link') {
						window.location.href = banner.link;
					}
				};

				var openChannel = function (channel) {
					if (channel.type === 'multi') {
						$state.go('main.channel-multi', {id: channel.id});
					} else if (channel.type === 'single') {
						$state.go('main.channel-single', {id: channel.id});
					} else if (channel.type === 'vip') {
						$state.go('main.channel-vip', {id: channel.id});
					}
				}
			}
		};
	}
});