define(function () {
	return ['RestService', 'HttpFileService', ShopService];

	function ShopService(RestService, HttpFileService) {
		return {
			save: function (shop) {
				return RestService.post('shop/save', shop);
			},
			get: function (id) {
				return RestService.post('shop/get/' + id);
			},
			list: function () {
				return RestService.post('shop/list');
			},
			enable: function (id) {
				return RestService.post('shop/enable/' + id);
			},
			disable: function (id) {
				return RestService.post('shop/disable/' + id);
			},
			delete: function (id) {
				return RestService.post('shop/delete/' + id);
			},
			setLocation: function (id, coordinates) {
				return RestService.post('shop/set/location/' + id, coordinates);
			},
			listByProvince: function (province) {
				return RestService.post('shop/list', province);
			},
			setCoverImage: function (id, file) {
				return HttpFileService.upload('shop/set/cover/' + id, file);
			}
		};
	}
});