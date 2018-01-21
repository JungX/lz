define(function () {
	return ['RestService', 'HttpFileService', ProductService];
	function ProductService(RestService, HttpFileService) {
		return {
			save: function (product) {
				return RestService.post('product/save', product);
			},
			delete: function (id) {
				return RestService.post('product/delete/' + id);
			},
			get: function (id) {
				return RestService.post('product/get/' + id);
			},
			setCoverImage: function (id, file) {
				return HttpFileService.upload('product/set/cover/' + id, file);
			},
			onsale:function (id) {
				return RestService.post('product/onsale/' + id);
			},
			unsale:function (id) {
				return RestService.post('product/unsale/' + id);
			}
		};
	}
});