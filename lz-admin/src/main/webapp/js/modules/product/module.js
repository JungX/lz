define([
	'angular',
	'./controllers/ProductCtrl',
	'./controllers/ProductListCtrl',
	'./services/ProductService'
], function (angular,
             ProductCtrl,
             ProductListCtrl,
             ProductService) {
	var module = angular.module('webApp.product', ['webApp.config', 'ui.router']);
	module.controller({
		ProductCtrl: ProductCtrl,
		ProductListCtrl: ProductListCtrl
	});

	module.factory({
		ProductService: ProductService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.product', {
			url: '/product',
			template: '<ui-view></ui-view>'
		}).state('main.product.list', {
			url: '/list/{status}',
			params: {'status': null},
			templateUrl: 'js/modules/product/templates/product.list.html'
		}).state('main.product.open', {
			url: '/{status}/open/{id}',
			templateUrl: 'js/modules/product/templates/product.html'
		});
	});
});