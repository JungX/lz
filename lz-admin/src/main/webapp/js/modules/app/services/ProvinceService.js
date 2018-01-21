define(function () {
	return ['RestService', ProvinceService];
	function ProvinceService(RestService) {
		return {
			provinces: function () {
				return RestService.post('provinces/provinces');
			},
			cities: function (code) {
				return RestService.post('provinces/cities/' + code);
			},
			areas: function (code) {
				return RestService.post('provinces/areas/' + code);
			},
			get: function (code) {
				return RestService.post('provinces/get/' + code);
			}
		};
	}
});