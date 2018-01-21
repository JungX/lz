define(
	function () {
		return ['Notification', AlertService];
		function AlertService(Notification) {
			return {
				success: function (message) {
					Notification.success({message: message, delay: 3000});
				},
				error: function (message) {
					Notification.error({message: message, delay: 3000});
				},
				warning: function (message) {
					Notification.warning({message: message, delay: 3000});
				},
				info: function (message) {
					Notification.info({message: message, delay: 3000});
				}
			};
		}
	});