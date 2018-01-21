define(function () {
	return [sortBar];
	function sortBar() {
		return {
			restrict: 'E',
			scope: {
				onSelect: '&'
			},
			template: '<div class="list-select-box d-flex">' +
			'<a class="flex1" ng-class="{on: sortType === \'latest\'}" ng-click="select(\'latest\')">最新</a>' +
			'<span class="linex"></span>' +
			'<a class="flex1" ng-class="{on: sortType === \'hottest\'}" ng-click="select(\'hottest\')">最热</a>' +
			'</div>',
			link: function ($scope) {
				$scope.sortType = 'latest';
				$scope.select = function (sortType) {
					$scope.sortType = sortType;
					$scope.onSelect({sortType: $scope.sortType});
				}
			}
		};
	}
});