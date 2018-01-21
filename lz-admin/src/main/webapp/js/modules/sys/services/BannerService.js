define(function () {
	return ['RestService', 'HttpFileService', BannerService];
	function BannerService(RestService, HttpFileService) {
		return {
			get: function (id) {
				return RestService.post('banner/get/' + id);
			},
			save: function (setId, data) {
				return RestService.post('banner/save/' + setId, data);
			},
			addImage: function (id, file) {
				return HttpFileService.upload('banner/add/image/' + id, file);
			},
			removeImage: function (id, imageId) {
				return RestService.post('banner/remove/image/' + id + '/' + imageId);
			},
			delete: function (setId, id) {
				return RestService.post('banner/delete/' + setId + '/' + id);
			}
		};
	}
});