define(function () {
	return ['RestService', UserService];
	function UserService(RestService) {
		return {
			save: function (user) {
				return RestService.post('user/save', user);
			},
			get: function (id) {
				return RestService.post('user/get/' + id);
			},
			list: function () {
				return RestService.post('user/list');
			},
			enable: function (id) {
				return RestService.post('user/enable/' + id);
			},
			disable: function (id) {
				return RestService.post('user/disable/' + id);
			},
			delete: function (id) {
				return RestService.post('user/delete/' + id);
			},
			ask: function (id) {
				return RestService.post('user/ask/partner/' + id);
			}
		};
	}
});