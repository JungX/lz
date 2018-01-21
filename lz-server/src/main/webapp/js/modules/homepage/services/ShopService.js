define(function () {
	return ['RestService', ShopService];

	function ShopService(RestService) {
		return {
			get: function (id) {
				return RestService.post('shop/get/' + id);
			}
		}
	}
});