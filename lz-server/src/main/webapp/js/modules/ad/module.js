define([
	'angular',
	'./controllers/AdCtrl',
	'./controllers/CodeCtrl',
	'./controllers/GameContinueCtrl',
	'./controllers/GameOverCtrl',
	'./services/DeviceService'
], function (angular,
             AdCtrl,
             CodeCtrl,
             GameContinueCtrl,
             GameOverCtrl,
             DeviceService) {
	var module = angular.module('webApp.ad', ['webApp.config', 'ui.router']);
	module.controller({
		AdCtrl: AdCtrl,
		CodeCtrl: CodeCtrl,
		GameContinueCtrl: GameContinueCtrl,
		GameOverCtrl: GameOverCtrl
	});
	module.factory({
		DeviceService: DeviceService
	});
	module.directive({});

	module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('homepage', {
			url: '/homepage',
			templateUrl: 'js/modules/ad/templates/homepage.html'
		}).state('code', {
			url: '/code/{deviceId}',
			templateUrl: 'js/modules/ad/templates/code.html'
		}).state('game-continue', {
			url: '/game-continue',
			templateUrl: 'js/modules/ad/templates/game.continue.html'
		}).state('game-over', {
			url: '/game-over',
			templateUrl: 'js/modules/ad/templates/game.over.html'
		});
		$urlRouterProvider.otherwise('/homepage');
	});
});