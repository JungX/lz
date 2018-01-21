/**
 * Created by zhaoyang on 16/11/11.
 */
define(function () {
	return ['$q', imageViewer];
	function imageViewer($q) {

		var loadImage = function (src) {
			var deferred = $q.defer();
			var image = new Image();

			image.onload = function () {
				if (typeof this.complete === false || this.naturalWidth === 0) {
					deferred.reject();
				}
				deferred.resolve(image);
			};

			image.onerror = function () {
				deferred.reject();
			};

			image.src = src;
			return deferred.promise;
		};

		return {
			restrict: 'E',
			replace: true,
			scope: {
				imageId: '@',
				nullSrc: '@',
				src: '@?',
				onLoad: '&?'
			},
			template: '<img ng-src="{{img}}" />',
			link: function ($scope) {
				$scope.$watch('nullSrc', function () {
					if (!!$scope.nullSrc && !$scope.imageId) {
						$scope.img = $scope.nullSrc;
					}
				});
				$scope.$watch('imageId', function () {
					if ($scope.imageId && $scope.imageId.length > 0) {
						var src = 'images/origin/' + $scope.imageId;
						loadImage(src).then(function (resp) {
							$scope.img = resp.src;
							if (!!$scope.onLoad) {
								$scope.onLoad({image: {width: resp.width, height: resp.height}});
							}
						});
					}
				});
			}
		};
	}
});