define([
	'angular',
	'./controllers/LoginCtrl',
	'./controllers/MainCtrl',
	'./services/ProvinceService'
], function (angular,
             LoginCtrl,
             MainCtrl,
             ProvinceService) {
	var module = angular.module('webApp.app', ['webApp.config', 'ui.router']);
	module.controller({
		LoginCtrl: LoginCtrl,
		MainCtrl: MainCtrl
	});

	module.factory({
		ProvinceService: ProvinceService
	});

	module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('main', {
			url: '/main',
			templateUrl: 'js/modules/app/templates/main.html'
		}).state('login', {
			url: '/login',
			templateUrl: 'js/modules/app/templates/login.html'
		});

		$urlRouterProvider.otherwise('/main');
	});
});