define([
	'angular',
	'./controllers/MenuCtrl',
	'./controllers/ButtonCreateCtrl',
	'./controllers/ButtonEditCtrl',
	'./controllers/SubButtonsCtrl',
	'./services/MenuService',
	'./services/ButtonService'
], function (angular,
             MenuCtrl,
             ButtonCreateCtrl,
             ButtonEditCtrl,
             SubButtonsCtrl,
             MenuService,
             ButtonService) {
	var module = angular.module('webApp.wx', ['webApp.config', 'ui.router']);
	module.controller({
		MenuCtrl: MenuCtrl,
		ButtonCreateCtrl: ButtonCreateCtrl,
		ButtonEditCtrl: ButtonEditCtrl,
		SubButtonsCtrl: SubButtonsCtrl
	});

	module.factory({
		MenuService: MenuService,
		ButtonService: ButtonService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.wx', {
			url: '/wx',
			template: '<ui-view></ui-view>'
		}).state('main.wx.menu', {
			url: '/menu',
			templateUrl: 'js/modules/wx/templates/menu.html',
			controller: 'MenuCtrl'
		}).state('main.wx.menu-button-create', {
			url: '/button/create/{index1}',
			templateUrl: 'js/modules/wx/templates/button.html',
			controller: 'ButtonCreateCtrl'
		}).state('main.wx.menu-button-edit', {
			url: '/button/edit/{index1}/{index2}',
			templateUrl: 'js/modules/wx/templates/button.html',
			controller: 'ButtonEditCtrl'
		}).state('main.wx.menu-sub-buttons', {
			url: '/sub/buttons/{index1}',
			templateUrl: 'js/modules/wx/templates/sub.buttons.html',
			controller: 'SubButtonsCtrl'
		});
	});
});