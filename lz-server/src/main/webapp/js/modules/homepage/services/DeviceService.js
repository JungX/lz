define(function () {
	return ['RestService', DeviceService];

	function DeviceService(RestService) {
		return {
			near: function (coordinates) {
				return RestService.post('device/near', coordinates);
			}
		}
	}
});