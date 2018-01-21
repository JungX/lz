require.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		lodash: '../bower_components/lodash/dist/lodash.min',
		moment: '../bower_components/moment/min/moment.min',
		angular: '../bower_components/angular/angular.min',
		angularAnimate: '../bower_components/angular-animate/angular-animate.min',
		angularUIRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
		angularMessages: '../bower_components/angular-messages/angular-messages.min',
		angularAria: '../bower_components/angular-aria/angular-aria.min',
		angularCookies: '../bower_components/angular-cookies/angular-cookies.min',
		restangular: '../bower_components/restangular/dist/restangular.min',
		'angular-loading-bar': '../bower_components/angular-loading-bar/build/loading-bar.min',
		'angular-ui-notification': '../bower_components/angular-ui-notification/dist/angular-ui-notification.min',
		fastclick: '../bower_components/fastclick/lib/fastclick',
		flexslider: '../bower_components/flexslider/jquery.flexslider-min',
		angularFlexslider: '../bower_components/angular-flexslider/angular-flexslider',
		template: './template',
		angularSanitize:'../bower_components/angular-sanitize/angular-sanitize.min',
		'ngInfiniteScroll': '../bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min',
		ngFileUpload: '../bower_components/ng-file-upload/ng-file-upload-all.min',
		cropper: '../bower_components/cropperjs/dist/cropper',
		ctb: '../bower_components/ctb/js/canvas-to-blob.min'
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
		moment: {
			exports: 'moment'
		},
		'angular-loading-bar': {
			deps: ['angular', 'angularAnimate']
		},
		'angular-ui-notification': {
			deps: ['angular', 'angularAnimate']
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
		angularCookies: {
			deps: ['angular']
		},
		flexslider: {
			deps: ['jquery']
		},
		angularFlexslider: {
			deps: ['flexslider', 'angular']
		},
		angularSanitize: {
			deps: ['angular']
		},
		'ngInfiniteScroll': {
			deps: ['angular']
		},
		ngFileUpload: {
			deps: ["angular"]
		},
		cropper: {
			deps: ['jquery']
		}
	},
	waitSeconds: 0
});

require(['bootstrap']);

