define(function () {
	return ['TagsService', tagsBar];
	function tagsBar(TagsService) {
		return {
			restrict: 'E',
			scope: {
				onSelect: '&'
			},
			template: '<div class="tips-box d-flex flex-jc-between">' +
			'<a class="flex1" ng-class="{on: null === tag}" ng-click="selectTag(null)">全部</a>' +
			'<a ng-repeat="_tag in tags" class="flex1" ng-class="{on: _tag.name === tag}" ng-click="selectTag(_tag.name)">{{_tag.name}}</a>' +
			'</div>',
			link: function ($scope) {
				$scope.tags = [];
				$scope.tag = undefined;
				TagsService.list().then(function (data) {
					$scope.tags = data;
				});

				$scope.selectTag = function (tag) {
					$scope.tag = tag;
					$scope.onSelect({tag: tag});
				}
			}
		};
	}
});