define([
	'angular',
	'./services/AlertService',
	'./services/ConfirmService',
	'./services/ModalService',
	'./services/RestService',
	'./services/Utils',
	'./services/WXService',
	'./directives/imageViewer'
], function (angular,
             AlertService,
             ConfirmService,
             ModalService,
             RestService,
             Utils,
             WXService,
             imageViewer) {
	var module = angular.module('webApp.common', []);
	module.factory({
		AlertService: AlertService,
		ConfirmService: ConfirmService,
		ModalService: ModalService,
		RestService: RestService,
		Utils: Utils,
		WXService: WXService
	});

	module.directive({
		imageViewer: imageViewer
	});

	module.filter({});

	module.provider({});

});