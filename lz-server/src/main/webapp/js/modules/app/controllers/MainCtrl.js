define([], function () {
	return ['$scope', '$state', '$location', '$rootScope', MainCtrl];

	function MainCtrl($scope, $state, $location, $rootScope) {
		$scope.totalNewsCount = 0;
		$scope.isActive = function (location) {
			return ($location.path().indexOf(location)) == 0;
		};

		$rootScope.$on('unauth', function () {
			$state.go('login');
		});

	}
});