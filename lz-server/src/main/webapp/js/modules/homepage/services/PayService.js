define(function () {
	return ['RestService', PayService];

	function PayService(RestService) {
		return {
			pay: function (data) {
				return RestService.post('pay/pay', data);
			},
			continue: function (data) {
				return RestService.post('pay/pay/continue', data);
			}
		};
	}
});