define([
	'angular',
	'config',
	'restangular',
	'angularAnimate',
	'angularUIRouter',
	'flexslider',
	'angularFlexslider',
	'modules/common/module',
	'modules/ad/module',
	'template'
], function (angular) {
	var module = angular.module('webApp', [
		'template',
		'webApp.config',
		'webApp.common',
		'webApp.ad',
		'restangular',
		'angular-flexslider',
		'ngAnimate'
	]);


	module.run(function () {
	});

	module.config(function (RestangularProvider, FD_HOST, FD_CONTEXT, FD_API_URL) {
		RestangularProvider.setBaseUrl(FD_HOST + FD_CONTEXT + FD_API_URL);
		RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
			if (data.resultType == 'ERROR') {
				deferred.reject(data);
			} else {
				deferred.resolve(data);
			}
		});
		RestangularProvider.setDefaultHeaders({
			"X-AUTH-TOKEN": localStorage.getItem("token")
		});
	});
});