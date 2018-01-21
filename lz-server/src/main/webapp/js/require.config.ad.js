require.config({
	paths: {
		jquery: '../bower_components/jquery/dist/jquery.min',
		lodash: '../bower_components/lodash/dist/lodash.min',
		angular: '../bower_components/angular/angular.min',
		angularAnimate: '../bower_components/angular-animate/angular-animate.min',
		angularUIRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
		restangular: '../bower_components/restangular/dist/restangular.min',
		flexslider: '../bower_components/flexslider/jquery.flexslider-min',
		angularFlexslider: '../bower_components/angular-flexslider/angular-flexslider',
		template: './template'
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
		'template': {
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
		}
	},
	waitSeconds: 0
});

require(['bootstrap.ad']);

