define([
	'angular'
], function (angular) {
	'use strict';
	angular.module('webApp.config', [])
		.constant('DEBUG', false)
		.constant('FD_HOST', 'http://localhost:8083/')
		.constant('FD_CONTEXT', '')
		.constant('FD_API_URL', 'restful/');
	;
});