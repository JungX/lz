define([
	'angular',
	'./controllers/MainCtrl',
	'./controllers/WalletCtrl',
	'./controllers/OrdersCtrl',
	'./services/UserService',
	'./services/AccountService',
	'./directives/userHeader'
], function (angular,
             MainCtrl,
             WalletCtrl,
             OrdersCtrl,
             UserService,
             AccountService,
             userHeader) {
	var module = angular.module('webApp.app', ['webApp.config', 'ui.router']);
	module.controller({
		MainCtrl: MainCtrl,
		WalletCtrl: WalletCtrl,
		OrdersCtrl: OrdersCtrl
	});

	module.factory({
		UserService: UserService,
		AccountService: AccountService
	});

	module.directive({userHeader: userHeader});

	module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('main', {
			url: '/main',
			templateUrl: 'js/modules/app/templates/main.html'
		}).state('wallet', {
			url: '/wallet',
			templateUrl: 'js/modules/app/templates/wallet.html'
		}).state('orders', {
			url: '/orders',
			templateUrl: 'js/modules/app/templates/orders.html'
		});

		$urlRouterProvider.otherwise('/main');
	});
});