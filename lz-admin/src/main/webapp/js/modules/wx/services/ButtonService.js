/**
 * Created by zhaoyang on 17/4/16.
 */
define(function () {
	return ['RestService', ButtonService];
	function ButtonService(RestService) {
		return {
			create: function (index1, button) {
				return RestService.post('weixin/ui/menu/button/create/' + index1, button);
			},
			get: function (index1, index2) {
				return RestService.post('weixin/ui/menu/button/get', {index1: index1, index2: index2});
			},
			save: function (index1, index2, button) {
				return RestService.post('weixin/ui/menu/button/update/' + index1 + '/' + index2, button);
			},
			delete: function (index1, index2) {
				return RestService.post('weixin/ui/menu/button/delete/' + index1 + '/' + index2);
			}
		};
	}
});