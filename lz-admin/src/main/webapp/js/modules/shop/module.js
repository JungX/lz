define([
	'angular',
	'./controllers/ShopsCtrl',
	'./controllers/ShopCtrl',
	'./controllers/ShopBaseCtrl',
	'./controllers/ShopLocationCtrl',
	'./services/ShopService'
], function (angular,
             ShopsCtrl,
             ShopCtrl,
             ShopBaseCtrl,
             ShopLocationCtrl,
             ShopService) {
	var module = angular.module('webApp.shop', ['webApp.config', 'ui.router']);
	module.controller({
		ShopsCtrl: ShopsCtrl,
		ShopCtrl: ShopCtrl,
		ShopBaseCtrl: ShopBaseCtrl,
		ShopLocationCtrl: ShopLocationCtrl
	});

	module.factory({
		ShopService: ShopService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.shop', {
			url: '/shop',
			template: '<ui-view></ui-view>'
		}).state('main.shop.list', {
			url: '/list/{status}',
			templateUrl: 'js/modules/shop/templates/shops.html'
		}).state('main.shop.open', {
			url: '/open/{shopId}',
			templateUrl: 'js/modules/shop/templates/shop.html'
		}).state('main.shop.open.base', {
			url: '/base/{shopId}',
			data: {
				'selectedTab': 0
			},
			views: {
				'base': {
					templateUrl: 'js/modules/shop/templates/shop.base.html'
				}
			}
		}).state('main.shop.open.location', {
			url: '/location/{shopId}',
			data: {
				'selectedTab': 1
			},
			views: {
				'location': {
					templateUrl: 'js/modules/shop/templates/shop.location.html'
				}
			}
		});
	});
});