define(function () {
	return ['RestService', DeviceService];

	function DeviceService(RestService) {
		return {
			listAdImages: function () {
				return RestService.post('device/ad/images');
			}
		}
	}
});