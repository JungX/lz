/**
 * Created by zhaoyang on 16/11/16.
 */
define(function () {
	return [draggable];
	function draggable() {
		return {
			restrict: 'CA',
			scope: {},
			link: function (scope, element) {
				element.draggable().css("position", "absolute");
			}
		};
	}
});