define([
	'angular',
	'./controllers/UsersCtrl',
	'./controllers/UserCtrl',
	'./services/UserService'
], function (angular,
             UsersCtrl,
             UserCtrl,
             UserService) {
	var module = angular.module('webApp.user', ['webApp.config', 'ui.router']);
	module.controller({
		UsersCtrl: UsersCtrl,
		UserCtrl: UserCtrl
	});

	module.factory({
		UserService: UserService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.user', {
			url: '/user',
			template: '<ui-view></ui-view>'
		}).state('main.user.users', {
			url: '/list/{userType}',
			templateUrl: 'js/modules/user/templates/users.html'
		}).state('main.user.open', {
			url: '/{userType}/open/{userId}/{upperId}',
			templateUrl: 'js/modules/user/templates/user.html'
		});
	});
});