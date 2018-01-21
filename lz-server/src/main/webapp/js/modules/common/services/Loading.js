define(
	function () {
		return [Loading];
		function Loading() {
			return {
				start: function (message) {
					var msg = message | '正在载入';
					return ngDialog.open({
						template: '<p>' + msg + '</p>',
						className: 'ngdialog-theme-default',
						plain: true,
						showClose: false,
						cache: false
					});
				}
			};
		}
	});