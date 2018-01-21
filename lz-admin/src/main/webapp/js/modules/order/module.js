define([
	'angular',
	'./controllers/OrderCtrl',
	'./controllers/OrdersCtrl',
	'./services/OrderService'
], function (angular,
             OrderCtrl,
             OrdersCtrl,
             OrderService) {
	var module = angular.module('webApp.order', ['webApp.config', 'ui.router']);
	module.controller({
		OrderCtrl: OrderCtrl,
		OrdersCtrl: OrdersCtrl
	});

	module.factory({
		OrderService: OrderService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.order', {
			url: '/order',
			template: '<ui-view></ui-view>'
		}).state('main.order.orders', {
			url: '/orders',
			templateUrl: 'js/modules/order/templates/orders.html'
		}).state('main.order.open', {
			url: '/orders/open/{id}',
			templateUrl: 'js/modules/order/templates/order.html'
		});
	});
});