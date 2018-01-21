define(function () {
	return ['$state', userHeader];
	function userHeader($state) {
		var defaultHeaderMale = 'images/default-header-m.png';
		var defaultHeaderFemale = 'images/default-header-f.png';
		return {
			restrict: 'E',
			scope: {
				user: "=",
				index: '='
			},
			template: '<image-viewer image-id="{{user.header}}" null-src="{{defaultHeader}}" ng-click="openPerson()"></image-viewer>',
			link: function ($scope) {
				$scope.$watch('user', function () {
					if (!!$scope.user) {
						$scope.defaultHeader = $scope.user.sex === '女' ? defaultHeaderFemale : defaultHeaderMale;
					}
				});
				$scope.openPerson = function () {
					if($scope.user.level > 0) {
						$state.go('person', {id: $scope.user.id, anchor: $scope.index});
					}
				};
			}
		};
	}
});