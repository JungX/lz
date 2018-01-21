define(function () {
	return ['RestService', TagsService];
	function TagsService(RestService) {
		return {
			save: function (channel) {
				return RestService.post('tag/save', channel);
			},
			delete: function (id) {
				return RestService.post('tag/delete/' + id);
			},
			list: function () {
				return RestService.post('tag/list');
			}
		};
	}
});