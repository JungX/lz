define(function () {
	return ['ChannelLayoutService', '$state', channelContainer];
	function channelContainer(ChannelLayoutService, $state) {
		return {
			restrict: 'E',
			scope: true,
			templateUrl: 'js/modules/homepage/templates/channel.container.html',
			link: function ($scope) {
				ChannelLayoutService.get().then(function (layout) {
					$scope.channelLayout = layout;
				});

				$scope.openChannel = function (channel) {
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