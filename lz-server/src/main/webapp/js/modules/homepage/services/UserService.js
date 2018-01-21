define(function () {
	return ['RestService', UserService];

	function UserService(RestService) {
		return {
			login: function (data) {
				return RestService.post('user/login', data);
			},
			setPhone: function (data) {
				return RestService.post('user/set/phone', data);
			},
			sendCode: function (phone) {
				return RestService.post('user/send/sms/' + phone);
			}
		};
	}
});