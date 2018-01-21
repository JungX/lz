define(function () {
	return ['RestService', OrderService];
	function OrderService(RestService) {
		return {
			pay: function (id) {
				return RestService.post('order/pay/manual/' + id);
			},
			delete: function (id) {
				return RestService.post('order/delete/' + id);
			},
			get: function (id) {
				return RestService.post('order/get/' + id);
			}
		};
	}
});