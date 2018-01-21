define(function () {
	return ['RestService', ReportService];
	function ReportService(RestService) {
		return {
			save: function (channel) {
				return RestService.post('report/save', channel);
			},
			delete: function (id) {
				return RestService.post('report/delete/' + id);
			},
			get: function (id) {
				return RestService.post('report/get/' + id);
			}
		};
	}
});