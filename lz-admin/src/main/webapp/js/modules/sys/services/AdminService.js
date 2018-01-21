define(function () {
	return ['RestService', AdminService];
	function AdminService(RestService) {
		return {
			create: function (user) {
				return RestService.post('admin/create', user);
			},
			save: function (user) {
				return RestService.post('admin/save', user);
			},
			get: function (id) {
				return RestService.post('admin/get/' + id);
			},
			delete: function (id) {
				return RestService.post('admin/delete/' + id);
			},
			current: function () {
				return RestService.post('admin/current');
			}
		};
	}
});