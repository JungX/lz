require.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		lodash: '../bower_components/lodash/dist/lodash.min',
		moment: '../bower_components/moment/min/moment-with-locales.min',
		angular: '../bower_components/angular/angular.min',
		angularAnimate: '../bower_components/angular-animate/angular-animate.min',
		angularUIRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
		angularMessages: '../bower_components/angular-messages/angular-messages.min',
		angularAria: '../bower_components/angular-aria/angular-aria',
		restangular: '../bower_components/restangular/dist/restangular.min',
		'jquery.nicescroll': '../bower_components/jquery.nicescroll/jquery.nicescroll.min',
		ngFileUpload: '../bower_components/ng-file-upload/ng-file-upload-all.min',
		myBootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
		'angular-loading-bar': '../bower_components/angular-loading-bar/build/loading-bar.min',
		'angular-ui-notification': '../bower_components/angular-ui-notification/dist/angular-ui-notification.min',
		template: './template',
		'jquery-ui': '../bower_components/jquery-ui/jquery-ui.min',
		fastclick: '../bower_components/fastclick/lib/fastclick',
		adminLTE: '../bower_components/admin-lte/dist/js/app.min',
		angularMaterial: '../bower_components/angular-material/angular-material.min',
		angularTree: '../bower_components/angular-tree-control/angular-tree-control',
		'angular-smart-table': '../bower_components/angular-smart-table/dist/smart-table.min',
		'ngMaterialDatePicker': '../bower_components/angular-material-datetimepicker/js/angular-material-datetimepicker',
		wangEditor: '../bower_components/wangEditor/dist/js/wangEditor.min'

	},
	shim: {
		jquery: {
			exports: '$'
		},
		lodash: {
			exports: '_'
		},
		angular: {
			deps: ['jquery'],
			exports: 'angular'
		},
		angularAnimate: {
			deps: ['angular']
		},
		angularUIRouter: {
			deps: ['angular']
		},
		restangular: {
			deps: ['angular', 'lodash']
		},
		// moment: {
		// 	exports: 'moment'
		// },
		ngFileUpload: {
			deps: ["angular"]
		},
		'jquery.nicescroll': {
			deps: ['jquery']
		},
		myBootstrap: {
			deps: ['jquery']
		},
		'angular-loading-bar': {
			deps: ['angular', 'angularAnimate']
		},
		'angular-ui-notification': {
			deps: ['angular', 'angularAnimate']
		},
		'jquery-ui': {
			deps: ['jquery', 'angular']
		},
		'template': {
			deps: ['angular']
		},
		angularAria: {
			deps: ['angular']
		},
		angularMessages: {
			deps: ['angular']
		},
		adminLTE: {
			deps: ['jquery', 'jquery-ui']
		},
		angularMaterial: {
			deps: ['angularAria', 'angularAnimate', 'angularMessages']
		},
		angularTree: {
			deps: ['angular']
		},
		'angular-smart-table': {
			deps: ['angular']
		},
		wangEditor: {
			deps: ['jquery']
		},
		'ngMaterialDatePicker': {
			deps: ['angularMaterial']
		}
	},
	waitSeconds: 0
});

require(['bootstrap']);

