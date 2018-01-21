define([
	'jquery',
	'angular',
	'main.ad'
], function () {
	angular.element(document).ready(function () {
		var myElement = angular.element('[web-app]');
		angular.bootstrap(myElement, ['webApp']);
	});
});