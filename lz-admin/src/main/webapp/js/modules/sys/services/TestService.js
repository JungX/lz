define(function () {
	return ['RestService', TestService];
	function TestService(RestService) {
		return {
            clean: function () {
				return RestService.post('test/clean/');
			}
		};
	}
});