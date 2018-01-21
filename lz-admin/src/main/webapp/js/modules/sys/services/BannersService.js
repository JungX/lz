define(function () {
	return ['RestService', BannersService];
	function BannersService(RestService) {
		return {
			getHomepage: function () {
				return RestService.post('banners/get/homepage');
			},
			get: function (ownerId) {
				return RestService.post('banners/get/owner/' + ownerId);
			}
		};
	}
});