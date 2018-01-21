/**
 * Created by zhaoyang on 16/11/8.
 */
define(
	function () {
		return ['$q', ConfirmService];
		function ConfirmService($q) {
			var popup = function (type, message) {
				toaster.pop({
					type: type,
					body: message,
					timeout: 3000
				});
			};
			return {
				open: function (message) {
				   var confirm = $mdDialog.confirm()
                             .title(message)
                             //.textContent('All of the banks have agreed to forgive you your debts.')
                             .ariaLabel('Lucky day')
                             //.targetEvent(ev)
                             .ok('确定')
                             .cancel('取消');

                   return $mdDialog.show(confirm);
				}
			};
		}
	});