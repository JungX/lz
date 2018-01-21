define([
	'jquery',
	'angular',
	'main'
], function () {
	angular.element(document).ready(function () {
		var myElement = angular.element('[web-app]');
		angular.bootstrap(myElement, ['webApp']);
	});
});