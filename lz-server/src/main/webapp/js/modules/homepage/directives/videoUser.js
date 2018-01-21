define(function () {
	return ['$state', videoUser];
	function videoUser($state) {
		return {
			restrict: 'E',
			scope: {
				'user': '='
			},
			templateUrl: 'js/modules/homepage/templates/video.user.html',
			link: function ($scope) {
				console.dir($scope.user);

			}
		};
	}
});