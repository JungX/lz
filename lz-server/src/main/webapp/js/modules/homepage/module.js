define([
	'angular',
	'./controllers/HomepageCtrl',
	'./controllers/PayPledgeCtrl',
	'./controllers/MapCtrl',
	'./controllers/ShopCtrl',
	'./services/PayService',
	'./services/UserService',
	'./services/DeviceService',
	'./services/ShopService',
	'./directives/userHeader',
	'./directives/sortBar',
	'./directives/tagsBar',
	'./directives/channelTagsBar'
], function (angular,
             HomepageCtrl,
             PayPledgeCtrl,
             MapCtrl,
             ShopCtrl,
             PayService,
             UserService,
             DeviceService,
             ShopService,
             userHeader,
             sortBar,
             tagsBar,
             channelTagsBar) {
	var module = angular.module('webApp.homepage', ['webApp.config', 'ui.router']);
	module.controller({
		HomepageCtrl: HomepageCtrl,
		PayPledgeCtrl: PayPledgeCtrl,
		MapCtrl: MapCtrl,
		ShopCtrl: ShopCtrl
	});
	module.factory({
		PayService: PayService,
		UserService: UserService,
		DeviceService: DeviceService,
		ShopService: ShopService
	});
	module.directive({
		userHeader: userHeader,
		sortBar: sortBar,
		tagsBar: tagsBar,
		channelTagsBar: channelTagsBar
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.homepage', {
			url: '/homepage',
			templateUrl: 'js/modules/homepage/templates/homepage.html'
		}).state('main.shop', {
			url: '/shop/{shopId}',
			templateUrl: 'js/modules/homepage/templates/shop.html'
		}).state('main.pay-success', {
			url: '/pay/success',
			templateUrl: 'js/modules/homepage/templates/pay.success.html'
		}).state('main.pay-fail', {
			url: '/pay/fail',
			templateUrl: 'js/modules/homepage/templates/pay.fail.html'
		}).state('main.map', {
			url: '/map',
			templateUrl: 'js/modules/homepage/templates/map.html'
		});
	});
});