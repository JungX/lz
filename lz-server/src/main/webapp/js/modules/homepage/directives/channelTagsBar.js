define(function () {
	return ['ChannelService', channelTagsBar];
	function channelTagsBar(ChannelService) {
		return {
			restrict: 'E',
			scope: {
				channelId: '=',
				onSelect: '&'
			},
			template: '<div class="tips-box">' +
			'<a ng-class="{on: !tag}" ng-click="selectTag(null)">全部</a>' +
			'<a ng-repeat="_tag in tags" ng-class="{on: _tag === tag}" ng-click="selectTag(_tag)">{{_tag}}</a>' +
			'</div>',
			link: function ($scope) {
				$scope.tags = [];
				$scope.tag = undefined;
				ChannelService.get($scope.channelId).then(function (data) {
					$scope.tags = data.tags;
				});

				$scope.selectTag = function (tag) {
					$scope.tag = tag;
					$scope.onSelect({tag: tag});
				}
			}
		};
	}
});