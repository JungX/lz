define(function () {
	return ['RestService', UserLevelConfigService];
	function UserLevelConfigService(RestService) {
		return {
			get: function (id) {
				return RestService.post('ulc/get/' + id);
			},
			save: function (userLevelConfig) {
				return RestService.post('ulc/save', userLevelConfig);
			},
			list: function () {
				return RestService.post('ulc/list');
			}
		};
	}
});