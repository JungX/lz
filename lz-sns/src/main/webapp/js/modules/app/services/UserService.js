define(
	function () {
		return ['$q', 'RestService', UserService];

		function UserService($q, RestService) {
			var currentUser;

			function UserService() {
				var self = this;
				self.getCurrent = function () {
					var deferred = $q.defer();
					if (!!currentUser) {
						deferred.resolve(currentUser);
					} else {
						RestService.post('user/current').then(function (data) {
							currentUser = data;
							deferred.resolve(currentUser);
						}, function () {
							deferred.reject();
						});
					}
					return deferred.promise;
				};
				self.isMe = function (user) {
					return !!currentUser ? currentUser.id === user.id : false;
				};
				self.updateInfo = function (data) {
					return RestService.post('user/update/info', data);
				};
				self.get = function (id) {
					return RestService.post('user/get/' + id);
				};
				self.sendCode = function (phone) {
					return RestService.post('user/unauth/send/sms/' + phone);
				};
				self.register = function (code, data) {
					return RestService.post('user/unauth/register/' + code, data);
				};
				self.getInfo = function (userId) {
					return RestService.post('user/info/' + userId);
				};
				self.forgetPWD = function (code, data) {
					return RestService.post('user/unauth/forget/pwd/' + code, data);
				};
				self.modifyPWD = function (data) {
					return RestService.post('user/modify/pwd', data);
				};
				self.destroy = function () {
					currentUser = null;
				};
				self.updatePO = function (data) {
					return RestService.post('user/unauth/update/po', data);
				};
				self.unbindWeixin = function () {
					return RestService.post('user/unbind/weixin');
				};
				self.bindWeixin = function (code) {
					return RestService.post('user/bind/weixin/' + code);
				};
			}

			return new UserService();
		}
	});