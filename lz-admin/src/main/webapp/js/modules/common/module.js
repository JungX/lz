define([
	'angular',
	'./services/HttpFileService',
	'./services/AlertService',
	'./services/ConfirmService',
	'./services/ImagePreviewService',
	'./services/ModalService',
	'./services/RestService',
	'./services/TableService',
	'./services/Utils',
	'./services/EditorService',
	'./directives/imageViewer',
	'./directives/smallCalendar',
	'./directives/draggable',
	'./directives/validate',
	'./directives/scroller',
	'./directives/arrayInput',
	'./directives/gallery',
	'./providers/scrollerOption'
], function (angular,
             HttpFileService,
             AlertService,
             ConfirmService,
             ImagePreviewService,
             ModalService,
             RestService,
             TableService,
             Utils,
             EditorService,
             imageViewer,
             smallCalendar,
             draggable,
             validate,
             scroller,
             arrayInput,
             gallery,
             scrollerOption) {
	var module = angular.module('webApp.common', []);

	module.factory({
		HttpFileService: HttpFileService,
		AlertService: AlertService,
		ConfirmService: ConfirmService,
		ImagePreviewService: ImagePreviewService,
		ModalService: ModalService,
		RestService: RestService,
		TableService: TableService,
		Utils: Utils,
		EditorService: EditorService
	});

	module.directive({
		imageViewer: imageViewer,
		smallCalendar: smallCalendar,
		draggable: draggable,
		validate: validate,
		scroller: scroller,
		arrayInput: arrayInput,
		gallery: gallery
	});
	module.provider({scrollerOption: scrollerOption});

});