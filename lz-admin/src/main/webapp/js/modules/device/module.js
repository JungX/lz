define([
	'angular',
	'./controllers/DeviceCtrl',
	'./controllers/DeviceBaseCtrl',
	'./controllers/DeviceLocationCtrl',
	'./controllers/DeviceListCtrl',
	'./services/DeviceService'
], function (angular,
             DeviceCtrl,
             DeviceBaseCtrl,
             DeviceLocationCtrl,
             DeviceListCtrl,
             DeviceService) {
	var module = angular.module('webApp.device', ['webApp.config', 'ui.router']);
	module.controller({
		DeviceCtrl: DeviceCtrl,
		DeviceBaseCtrl: DeviceBaseCtrl,
		DeviceLocationCtrl: DeviceLocationCtrl,
		DeviceListCtrl: DeviceListCtrl
	});

	module.factory({
		DeviceService: DeviceService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.device', {
			url: '/device',
			template: '<ui-view></ui-view>'
		}).state('main.device.list', {
			url: '/list',
			templateUrl: 'js/modules/device/templates/device.list.html'
		}).state('main.device.open', {
			url: '/open/{deviceId}',
			templateUrl: 'js/modules/device/templates/device.html'
		}).state('main.device.open.base', {
			url: '/base/{deviceId}',
			data: {
				'selectedTab': 0
			},
			views: {
				'base': {
					templateUrl: 'js/modules/device/templates/device.base.html'
				}
			}
		}).state('main.device.open.location', {
			url: '/location/{deviceId}',
			data: {
				'selectedTab': 1
			},
			views: {
				'location': {
					templateUrl: 'js/modules/device/templates/device.location.html'
				}
			}
		});
	});
});