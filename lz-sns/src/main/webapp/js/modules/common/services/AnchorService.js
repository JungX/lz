define(function () {
	return ['$rootScope', '$timeout', '$location', '$anchorScroll', AnchorService];
	function AnchorService($rootScope, $timeout, $location, $anchorScroll) {

		function AnchorService() {

			this.getNumber = function (defaultValue, offset) {
				return !!$rootScope.anchor ? Number($rootScope.anchor) + (offset || 5) : defaultValue;
			};

			this.go = function (offsetY) {
				if (!!$rootScope.anchor) {
					var target = 'anchor-' + $rootScope.anchor;
					$location.hash(target);
					$timeout(function () {
						$anchorScroll.yOffset = offsetY || 0;
						$anchorScroll();
						$rootScope.anchor = null;
					});
				}
			};

			this.record = function (anchor) {
				$rootScope.anchor = !!anchor ? anchor : null;
			}
		}

		return new AnchorService();
	}
});