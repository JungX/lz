define(function () {
	return ['RestService', 'HttpFileService', DevAdImageService];

	function DevAdImageService(RestService, HttpFileService) {
		return {
			delete: function (id) {
				return RestService.post('device/ad/image/delete/' + id);
			},
			add: function (file) {
				return HttpFileService.upload('device/ad/image/add', file);
			}
		};
	}
});