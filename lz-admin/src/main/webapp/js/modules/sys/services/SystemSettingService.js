define(function () {
	return ['RestService', SystemSettingService];
	function SystemSettingService(RestService) {
		return {
			save: function (setting) {
				return RestService.post('sys/setting/save', setting);
			},
			get: function () {
				return RestService.post('sys/setting/get');
			}
		};
	}
});