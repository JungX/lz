define(function () {
	return ['RestService', NotificationService];
	function NotificationService(RestService) {
		return {
			save: function (channel) {
				return RestService.post('notification/save', channel);
			},
			delete: function (id) {
				return RestService.post('notification/delete/' + id);
			},
			get: function (id) {
				return RestService.post('notification/get/' + id);
			}
		};
	}
});