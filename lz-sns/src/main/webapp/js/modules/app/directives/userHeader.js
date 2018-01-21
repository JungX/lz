define(function () {
	return ['$state', userHeader];

	function userHeader($state) {
		var defaultHeader = 'images/logo-small.png';
		return {
			restrict: 'E',
			scope: {
				user: "=",
				index: '='
			},
			template: '<image-viewer image-id="{{user.header}}" null-src="{{defaultHeader}}"></image-viewer>',
			link: function ($scope) {
				$scope.$watch('user', function () {
					if (!!$scope.user) {
						$scope.defaultHeader = defaultHeader;
					}
				});
			}
		};
	}
});