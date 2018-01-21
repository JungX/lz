define(
	function () {
		return [AlertService];

		function AlertService() {
			return {
				success: function (message) {
					toast({message: message, type: 'success'});
				},
				error: function (message) {
					toast({message: message, type: 'error'});
				},
				warning: function (message) {
					toast({message: message, type: 'warning'});
				},
				info: function (message) {
					toast({message: message, type: 'info'});
				}
			};
		}

		function toast(data) {
			var toast;
			toast = '<div id="toast" style="opacity: 1;display: none;">' +
				'<div class="weui-mask_transparent"></div>' +
				'<div class="weui-toast">' +
				'<p class="weui-toast__content">' + data.message + '</p>' +
				'</div>' +
				'</div>';

			if (!$('#toast').length) {
				$('body').append(toast);
			} else {
				$('#toast.weui-toast__content').html(msg);
			}
			$('#toast').fadeIn('fast', function () {
				setTimeout(function () {
					$('#toast').fadeOut('fast');
				}, 2600);
			});
		}
	});