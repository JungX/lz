define([], function () {
	return ['$scope', '$state', 'UserLevelConfigService', '$timeout', 'AlertService', 'ChannelSelectService', 'ChannelService', 'ConfirmService', UserLevelConfigCtrl];

	function initEditor() {
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
		editor.config.uploadImgUrl = 'restful/ulc/add/image';
		editor.config.uploadHeaders = {
			'X-AUTH-TOKEN': sessionStorage.getItem("token")
		};

		return editor;
	}

	function UserLevelConfigCtrl($scope, $state, UserLevelConfigService, $timeout, AlertService, ChannelSelectService, ChannelService, ConfirmService) {
		var id = $state.params.id;
		$scope.data = {};
		$scope.channels = [];
		var editor = initEditor();
		if (!!id) {
			editor.config.uploadParams = {
				id: id
			};
			UserLevelConfigService.get(id).then(function (data) {
				$scope.data = data;
				$timeout(function () {
					editor.create();
					editor.$txt.html($scope.data.content);
				});
			});
		}

		$scope.$watch('data.channels', function () {
			if (!!$scope.data.channels) {
				if ($scope.data.channels.length > 0) {
					ChannelService.list($scope.data.channels).then(function (data) {
						$scope.channels = [];
						_.forEach(data, function (channel) {
							$scope.channels.push(channel);
						})
					})
				} else {
					$scope.channels = [];
				}
			}
		}, true);

		$scope.addChannel = function () {
			ChannelSelectService.open().then(function (data) {
				if ($scope.data.channels.indexOf(data.id) === -1) {
					$scope.data.channels.push(data.id);
				}
			});
		};

		$scope.deleteChannel = function (id) {
			var idx = $scope.data.channels.indexOf(id);
			if (idx > -1) {
				$scope.data.channels.splice(idx, 1);
			}
		};

		$scope.submit = function () {
			if(!!editor && !!editor.$txt) {
				$scope.data.content = editor.$txt.html();
			}
			UserLevelConfigService.save($scope.data).then(function () {
				AlertService.success('保存成功');
				ConfirmService.open('保存成功,是否继续编辑?').then(function () {
					$state.go('main.sys.userLevel', {id: id});
				}, function () {
					$scope.exit();
				});
			});
		};

		$scope.exit = function () {
			$state.go('main.sys.userLevels');
		};
	}
});