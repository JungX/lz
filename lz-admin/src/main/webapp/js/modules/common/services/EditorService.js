define(
	function () {
		return [EditorService];
		function EditorService() {
			return {
				init: function (uploadImgUrl) {
					window.wangEditor.$body = $('body');
					var editor = new wangEditor('editor');
					editor.config.menus = [
						'source',
						'|',
						'bold',
						'underline',
						'italic',
						'strikethrough',
						'eraser',
						'forecolor',
						'bgcolor',
						'|',
						'quote',
						'fontfamily',
						'fontsize',
						'head',
						'unorderlist',
						'orderlist',
						'alignleft',
						'aligncenter',
						'alignright',
						'|',
						'link',
						'unlink',
						'table',
						'emotion',
						'|',
						'img',
						'location',
						'|',
						'undo',
						'redo'
					];
					editor.config.uploadImgUrl = uploadImgUrl;
					editor.config.uploadHeaders = {
						'X-AUTH-TOKEN': sessionStorage.getItem("token")
					};

					return editor;
				}
			};
		}
	});