/**
 * Created by zhaoyang on 16/11/12.
 */
define(
	function () {
		return ['$compile', '$templateCache', '$animate', '$document', '$rootScope', '$q', '$timeout', 'ConfirmService', ImagePreviewService];
		function ImagePreviewService($compile, $templateCache, $animate, $document, $rootScope, $q, $timeout, ConfirmService) {

			var defaults = {
				baseClass: 'ng-gallery',
				thumbClass: 'ng-thumb',
				templateUrl: 'ng-gallery.html'
			};

			var keys_codes = {
				enter: 13,
				esc: 27,
				left: 37,
				right: 39
			};

			function setScopeValues(scope) {
				scope.baseClass = scope.class || defaults.baseClass;
				scope.thumbClass = scope.thumbClass || defaults.thumbClass;
				scope.thumbsNum = scope.thumbsNum || 3; // should be odd
			}

			var scope = $rootScope.$new();
			var $body = angular.element($document[0].body);
			var templateUrl = 'image.preview.html';
			var $thumbwrapper;
			var $thumbnails;

			$templateCache.put(templateUrl,
				'<div id="_image_previewer">' +
				'<div class="ng-overlay" ng-show="opened">' +
				'</div>' +
				'<div class="ng-gallery-content" ng-show="opened">' +
				'  <div class="uil-ring-css" ng-show="loading"><div></div></div>' +
				'  <a ng-if="!!onDelete && images.length > 1" class="trash-popup" ng-click="trash()"><i class="fa fa-trash"></i></a>' +
				'  <a class="close-popup" ng-click="closeGallery()"><i class="fa fa-close"></i></a>' +
				'  <a class="nav-left" ng-click="prevImage()"><i class="fa fa-angle-left"></i></a>' +
				'  <img ng-src="{{ img }}" ng-click="nextImage()" ng-show="!loading" class="effect" />' +
				'  <a class="nav-right" ng-click="nextImage()"><i class="fa fa-angle-right"></i></a>' +
				'  <span class="info-text">{{imgName}}({{ index + 1 }}/{{ images.length }})</span>' +
				'  <div class="ng-thumbnails-wrapper">' +
				'    <div class="ng-thumbnails slide-left">' +
				'      <div ng-repeat="i in images">' +
				'        <img ng-src="images/origin/{{ i }}" ng-class="{\'active\': index === $index}" ng-click="changeImage($index)" />' +
				'      </div>' +
				'    </div>' +
				'  </div>' +
				'</div></div>'
			);

			var calculateThumbsWidth = function () {
				var width = 0, visible_width = 0;
				angular.forEach($thumbnails.find('img'), function (thumb) {
					width += thumb.clientWidth;
					width += 10; // margin-right
					visible_width = thumb.clientWidth + 10;
				});
				return {
					width: width,
					visible_width: visible_width * scope.thumbsNum
				};
			};

			var smartScroll = function (index) {
				$timeout(function () {
					var len = scope.images.length,
						width = scope.thumbs_width,
						current_scroll = $thumbwrapper[0].scrollLeft,
						item_scroll = parseInt(width / len, 10),
						i = index + 1,
						s = Math.ceil(len / i);

					//$thumbwrapper[0].scrollLeft = 0;
					//$thumbwrapper[0].scrollLeft = i * item_scroll - (s * item_scroll);
				}, 100);
			};

			var loadImage = function (i) {
				var deferred = $q.defer();
				var image = new Image();

				image.onload = function () {
					scope.loading = false;
					if (typeof this.complete === false || this.naturalWidth === 0) {
						deferred.reject();
					}
					deferred.resolve(image);
				};

				image.onerror = function () {
					deferred.reject();
				};

				image.src = 'images/origin/' + (scope.images[i].id || scope.images[i]);
				scope.loading = true;

				return deferred.promise;
			};

			var showImage = function (i) {
				loadImage(scope.index).then(function (resp) {
					scope.img = resp.src;
					scope.imgName = scope.images[i].name;
					smartScroll(scope.index);
				});
				scope.description = scope.images[i].description || '';
			};

			return {
				open: function (images, onDelete, onUpload) {
					scope.onDelete = onDelete;
					scope.onUpload = onUpload;
					setScopeValues(scope);
					if (scope.thumbsNum >= 11) {
						scope.thumbsNum = 11;
					}
					var linkFn = $compile($templateCache.get(templateUrl));
					var elem = linkFn(scope);
					$animate.enter(elem, $body);

					$body.bind('keydown', function (event) {
						if (!scope.opened) {
							return;
						}
						var which = event.which;
						if (which === keys_codes.esc) {
							scope.closeGallery();
						} else if (which === keys_codes.right || which === keys_codes.enter) {
							scope.nextImage();
						} else if (which === keys_codes.left) {
							scope.prevImage();
						}

						scope.$apply();
					});

					$thumbwrapper = angular.element(document.querySelectorAll('.ng-thumbnails-wrapper'));
					$thumbnails = angular.element(document.querySelectorAll('.ng-thumbnails'));

					scope.images = images;
					scope.index = 0;
					scope.opened = false;

					scope.thumb_wrapper_width = 0;
					scope.thumbs_width = 0;

					scope.trash = function () {
						if (!!scope.onDelete) {
							ConfirmService.open('确定删除?').then(function () {
								//scope.closeGallery();
								scope.onDelete({id: scope.images[scope.index].id || scope.images[scope.index]});
							})
						}
					};

					scope.changeImage = function (i) {
						scope.index = i;
						loadImage(scope.index).then(function (resp) {
							scope.img = resp.src;
							smartScroll(scope.index);
						});
					};

					scope.nextImage = function () {
						scope.index += 1;
						if (scope.index === scope.images.length) {
							scope.index = 0;
						}
						showImage(scope.index);
					};

					scope.prevImage = function () {
						scope.index -= 1;
						if (scope.index < 0) {
							scope.index = scope.images.length - 1;
						}
						showImage(scope.index);
					};

					scope.openGallery = function (i) {
						scope.index = i;
						showImage(scope.index);
						scope.opened = true;

						//$timeout(function () {
						//	var calculatedWidth = calculateThumbsWidth();
						//	scope.thumbs_width = calculatedWidth.width;
						//	$thumbnails.css({width: calculatedWidth.width + 'px'});
						//	$thumbwrapper.css({width: calculatedWidth.visible_width + 'px'});
						//	smartScroll(scope.index);
						//});
					};

					scope.closeGallery = function () {
						scope.opened = false;
						$animate.leave(elem);
						$body.unbind('keydown');
					};

					scope.openGallery(scope.index);
				}
			};
		}
	}
);