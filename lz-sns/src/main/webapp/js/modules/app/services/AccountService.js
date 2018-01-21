define(function () {
	return ['RestService', AccountService];

	function AccountService(RestService) {
		return {
			getPledge: function () {
				return RestService.post('account/pledge');
			},
			orders: function (condition) {
				return RestService.post('account/list/paged', condition);
			}
		};
	}
});