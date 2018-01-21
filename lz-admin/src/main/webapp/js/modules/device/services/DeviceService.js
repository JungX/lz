define(function () {
	return ['RestService', 'HttpFileService', DeviceService];
	function DeviceService(RestService, HttpFileService) {
		return {
			save: function (channel) {
				return RestService.post('device/save', channel);
			},
			delete: function (id) {
				return RestService.post('device/delete/' + id);
			},
			get: function (id) {
				return RestService.post('device/get/' + id);
			},
			setLocation: function (id, coordinates) {
				return RestService.post('device/set/location/' + id, coordinates);
			}
		}
	}
});