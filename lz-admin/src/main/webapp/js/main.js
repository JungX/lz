define([
	'angular',
	'config',
	'restangular',
	'angularAnimate',
	'angular-loading-bar',
	'angular-ui-notification',
	'ngFileUpload',
	'angularUIRouter',
	'myBootstrap',
	'fastclick',
	'adminLTE',
	'angularMaterial',
	'angularTree',
	'angular-smart-table',
	'wangEditor',
	'ngMaterialDatePicker',
	'modules/common/module',
	'modules/app/module',
	'modules/wx/module',
	'modules/sys/module',
	'modules/user/module',
	'modules/order/module',
    'modules/device/module',
	'modules/shop/module',
	'template'
], function (angular, config, moment) {
	// moment.locale('zh-cn');
	var module = angular.module('webApp', [
		'template',
		'webApp.config',
		'webApp.common',
		'webApp.app',
		'webApp.wx',
		'webApp.sys',
		'webApp.user',
		'webApp.order',
		'webApp.device',
		'webApp.shop',
		'restangular',
		'angular-loading-bar',
		'ui-notification',
		'ngFileUpload',
		'ngAnimate',
		'ngMaterial',
		'treeControl',
		'smart-table',
		'ngMaterialDatePicker'
	]);

	module.factory('interceptor', function ($q, $rootScope) {
		return {
			request: function (config) {
				if (sessionStorage.getItem("token")) {
					config.headers['X-AUTH-TOKEN'] = sessionStorage.getItem("token");
				}
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

	module.config(function ($httpProvider, RestangularProvider, cfpLoadingBarProvider,
	                        FD_HOST, FD_CONTEXT, FD_API_URL, $mdThemingProvider) {
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
		RestangularProvider.setDefaultHeaders({"X-AUTH-TOKEN": sessionStorage.getItem("token")});

		var neonYellowMap = $mdThemingProvider.extendPalette('yellow', {
			'500': 'ffc700',
			'contrastDefaultColor': 'black'
		});
		$mdThemingProvider.definePalette('neonYellowMap', neonYellowMap);
		$mdThemingProvider.theme('default')
			.primaryPalette('neonYellowMap')
			.accentPalette('orange')
			.warnPalette('pink');
	});
});