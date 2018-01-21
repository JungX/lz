define([
	'angular',
	'config',
	'moment',
	'restangular',
	'angularAnimate',
	'angularCookies',
	'angular-loading-bar',
	'angularUIRouter',
	'flexslider',
	'angularFlexslider',
	'angularSanitize',
	'ngInfiniteScroll',
	'ngFileUpload',
	'angular-ui-notification',
	'modules/common/module',
	'modules/app/module',
	'modules/homepage/module',
	'template'
], function (angular, config, moment) {
	moment.locale('zh-cn');
	var module = angular.module('webApp', [
		'template',
		'webApp.config',
		'webApp.common',
		'webApp.app',
		'webApp.homepage',
		'restangular',
		'angular-flexslider',
		'angular-loading-bar',
		'ngAnimate',
		'ngCookies',
		'ngSanitize',
		'infinite-scroll',
		'ngFileUpload',
		'ui-notification'
	]);

	module.factory('interceptor', function ($q, $rootScope) {
		return {
			request: function (config) {
				if (!!localStorage.getItem("token")) {
					config.headers['X-AUTH-TOKEN'] = localStorage.getItem("token");
				}
				//if (!!localStorage.getItem("openId")) {
				//	config.headers['OPENID'] = localStorage.getItem("openId");
				//}
				return config;
			},
			responseError: function (response) {
				if (response.status == 401) {
					$rootScope.$broadcast('unauth');
				}
				return $q.reject(response);
			}
		};
	});

	module.run(function (WXService) {
		WXService.init();
	});

	module.config(function ($httpProvider, RestangularProvider, cfpLoadingBarProvider,
	                        FD_HOST, FD_CONTEXT, FD_API_URL, NotificationProvider) {
		cfpLoadingBarProvider.includeSpinner = false;
		$httpProvider.interceptors.push('interceptor');
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
			//"OPENID": localStorage.getItem("openId")
		});
		NotificationProvider.setOptions({
			positionX: 'center',
			startTop: 100,
			verticalSpacing: 200,
			maxCount: 1
		});
	});
});