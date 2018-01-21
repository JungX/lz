define([
	'angular',
	'./controllers/ChannelLayoutCtrl',
	'./controllers/BannersCtrl',
	'./controllers/BannerCtrl',
	'./controllers/TagsCtrl',
	'./controllers/PagesCtrl',
	'./controllers/PageCtrl',
	'./controllers/AdminsCtrl',
	'./controllers/AdminCtrl',
	'./controllers/ReportsCtrl',
	'./controllers/ReportCtrl',
	'./controllers/DevAdImagesCtrl',
	'./controllers/NotificationsCtrl',
	'./controllers/NotificationCtrl',
	'./controllers/NotificationUsersSelectCtrl',
	'./controllers/SystemSettingCtrl',
	'./services/ChannelLayoutService',
	'./services/BannersService',
	'./services/BannerService',
	'./services/TagsService',
	'./services/AdminService',
	'./services/PageService',
	'./services/PageSelectService',
	'./services/ReportService',
	'./services/DevAdImageService',
	'./services/NotificationService',
	'./services/SystemSettingService'
], function (angular,
             ChannelLayoutCtrl,
             BannersCtrl,
             BannerCtrl,
             TagsCtrl,
             PagesCtrl,
             PageCtrl,
             AdminsCtrl,
             AdminCtrl,
             ReportsCtrl,
             ReportCtrl,
             DevAdImagesCtrl,
             NotificationsCtrl,
             NotificationCtrl,
             NotificationUsersSelectCtrl,
             SystemSettingCtrl,
             ChannelLayoutService,
             BannersService,
             BannerService,
             TagsService,
             AdminService,
             PageService,
             PageSelectService,
             ReportService,
             DevAdImageService,
             NotificationService,
             SystemSettingService) {
	var module = angular.module('webApp.sys', ['webApp.config', 'ui.router']);
	module.controller({
		ChannelLayoutCtrl: ChannelLayoutCtrl,
		BannersCtrl: BannersCtrl,
		BannerCtrl: BannerCtrl,
		TagsCtrl: TagsCtrl,
		PagesCtrl: PagesCtrl,
		PageCtrl: PageCtrl,
		AdminsCtrl: AdminsCtrl,
		AdminCtrl: AdminCtrl,
		ReportsCtrl: ReportsCtrl,
		ReportCtrl: ReportCtrl,
		DevAdImagesCtrl: DevAdImagesCtrl,
		NotificationsCtrl: NotificationsCtrl,
		NotificationCtrl: NotificationCtrl,
		NotificationUsersSelectCtrl: NotificationUsersSelectCtrl,
		SystemSettingCtrl: SystemSettingCtrl
	});

	module.factory({
		ChannelLayoutService: ChannelLayoutService,
		BannersService: BannersService,
		BannerService: BannerService,
		TagsService: TagsService,
		AdminService: AdminService,
		PageService: PageService,
		PageSelectService: PageSelectService,
		ReportService: ReportService,
		DevAdImageService: DevAdImageService,
		NotificationService: NotificationService,
		SystemSettingService: SystemSettingService
	});

	module.config(function ($stateProvider) {
		$stateProvider.state('main.sys', {
			url: '/sys',
			template: '<ui-view></ui-view>'
		}).state('main.sys.channel-layout', {
			url: '/channel-layout',
			templateUrl: 'js/modules/sys/templates/channel.layout.html'
		}).state('main.sys.banners', {
			url: '/banners',
			templateUrl: 'js/modules/sys/templates/banners.html'
		}).state('main.sys.banner-create', {
			url: '/banner/{setId}',
			templateUrl: 'js/modules/sys/templates/banner.html'
		}).state('main.sys.banner-edit', {
			url: '/banner/{setId}/{id}',
			templateUrl: 'js/modules/sys/templates/banner.html'
		}).state('main.sys.tags', {
			url: '/tags',
			templateUrl: 'js/modules/sys/templates/tags.html'
		}).state('main.sys.pages', {
			url: '/pages',
			templateUrl: 'js/modules/sys/templates/pages.html'
		}).state('main.sys.page', {
			url: '/page/{id}',
			templateUrl: 'js/modules/sys/templates/page.html'
		}).state('main.sys.admins', {
			url: '/admins',
			templateUrl: 'js/modules/sys/templates/admins.html'
		}).state('main.sys.admin', {
			url: '/admin/{id}',
			templateUrl: 'js/modules/sys/templates/admin.html'
		}).state('main.sys.reports', {
			url: '/reports',
			templateUrl: 'js/modules/sys/templates/reports.html'
		}).state('main.sys.report', {
			url: '/report/{id}',
			templateUrl: 'js/modules/sys/templates/report.html'
		}).state('main.sys.dev-ad-images', {
			url: '/dev/ad/images',
			templateUrl: 'js/modules/sys/templates/dev.ad.images.html'
		}).state('main.sys.notifications', {
			url: '/notifications',
			templateUrl: 'js/modules/sys/templates/notifications.html'
		}).state('main.sys.notification', {
			url: '/notification/{id}',
			templateUrl: 'js/modules/sys/templates/notification.html'
		}).state('main.sys.system-setting', {
			url: '/system/setting',
			templateUrl: 'js/modules/sys/templates/system.setting.html'
		});
	});
});