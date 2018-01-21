/**
 * Created by zhaoyang on 17/4/16.
 */
define(function () {
	return ['RestService', MenuService];
	function MenuService(RestService) {
		return {
			download: function () {
				return RestService.post('weixin/ui/menu/download');
			},
			upload: function () {
				return RestService.post('weixin/ui/menu/upload');
			}
		};
	}
});