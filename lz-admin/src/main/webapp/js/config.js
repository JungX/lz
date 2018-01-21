define([
	'angular'
], function (angular) {
	'use strict';
	angular.module('webApp.config', [])
		.constant('DEBUG', false)
		.constant('FD_HOST', 'http://localhost:8081/')
		.constant('FD_CONTEXT', '')
		.constant('FD_API_URL', 'restful/')
		.constant('LEVELS', {
			0: '普通用户',
			1: '会员',
			2: 'VIP会员',
			3: '合伙人',
			4: '投资人'
		});
	;
});