define(function () {
	return ['RestService', PageService];
	function PageService(RestService) {
		return {
			save: function (channel) {
				return RestService.post('page/save', channel);
			},
			delete: function (id) {
				return RestService.post('page/delete/' + id);
			},
			get: function (id) {
				return RestService.post('page/get/' + id);
			}
		};
	}
});