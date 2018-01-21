define(function () {
	return ['RestService', FollowService];
	function FollowService(RestService) {
		return {
			do: function (userId) {
				return RestService.post('follow/do/' + userId);
			},
			cancel: function (userId) {
				return RestService.post('follow/cancel/' + userId);
			},
			listFollowing: function (userId, condition) {
				return RestService.post('follow/list/following/' + userId, condition);
			},
			listFollowed: function (userId, condition) {
				return RestService.post('follow/list/followed/' + userId, condition);
			}
		};
	}
});