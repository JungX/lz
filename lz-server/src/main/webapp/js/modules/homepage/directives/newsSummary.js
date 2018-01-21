define(function () {
	return ['NewsService', '$state', newsSummary];
	function newsSummary(NewsService, $state) {
		return {
			restrict: 'E',
			scope: {
				'data': '=',
				'index': '='
			},
			templateUrl: 'js/modules/homepage/templates/news.summary.html',
			link: function ($scope) {
				$scope.anchor = 'anchor-' + $scope.index;
				$scope.open = function () {
					$state.go('news', {id: $scope.data.id, anchor: $scope.index});
				};
			}
		};
	}
});