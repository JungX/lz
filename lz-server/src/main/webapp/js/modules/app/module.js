define([
	'angular',
	'./controllers/LoginCtrl',
	'./controllers/MainCtrl',
	'./controllers/ForgetCtrl',
	'./services/FollowService'
], function (angular,
             LoginCtrl,
             MainCtrl,
             ForgetCtrl,
             FollowService) {
	var module = angular.module('webApp.app', ['webApp.config', 'ui.router']);
	module.controller({
		LoginCtrl: LoginCtrl,
		MainCtrl: MainCtrl,
		ForgetCtrl: ForgetCtrl
	});

	module.factory({
		FollowService: FollowService
	});

	module.directive({});

	module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('main', {
			url: '/main',
			templateUrl: 'js/modules/app/templates/main.html'
		}).state('login', {
			url: '/login/{phone}',
			templateUrl: 'js/modules/app/templates/login.html'
		}).state('forget', {
			url: '/forget',
			templateUrl: 'js/modules/app/templates/forget.html'
		});

		$urlRouterProvider.otherwise('/main/homepage');
	});
});