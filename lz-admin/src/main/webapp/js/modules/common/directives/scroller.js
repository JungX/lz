/**
 * Created by zhaoyang on 16/11/16.
 */
define(['angular', 'jquery.nicescroll'], function (angular) {
	return ['scrollerOption', scroller];
	function scroller(scrollerOption) {
		var defaultOption = {
			cursorcolor: "#777777",
			cursoropacitymax: 0.7,
			touchbehavior: false,
			cursorwidth: "4px",
			cursorborder: "0",
			cursorborderradius: "6px",
			zindex: 999,
			autohidemode: 'scroll',
			horizrailenabled: false
		};

		var map = {};
		return {
			restrict: 'CA',
			scope: {},
			link: function (scope, element) {
				map[scope.$id] = $(element).niceScroll(scrollerOption.option || defaultOption);
				scope.$on('$destroy', function () {
					if (angular.isDefined(map[scope.$id])) {
						map[scope.$id].remove();
						delete map[scope.$id]
					}
				})
			}
		};
	}
});