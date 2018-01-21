define(function () {
	return ['RestService', ChannelLayoutService];
	function ChannelLayoutService(RestService) {
		return {
			save: function (layout) {
				return RestService.post('channel/layout/save', layout);
			},
			get: function () {
				return RestService.post('channel/layout/get');
			}
		};
	}
});