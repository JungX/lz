define([], function () {
	return ['$scope', 'ChannelLayoutService', 'ChannelService', 'AlertService', ChannelLayoutCtrl];

	function ChannelLayoutCtrl($scope, ChannelLayoutService, ChannelService, AlertService) {
		$scope.data = {
			rows: []
		};

		ChannelLayoutService.get().then(function (data) {
			if (!!data) {
				$scope.data = data;
				var rows = [];
				for (var i in data.rows) {
					var row = data.rows[i];
					if (row.channels.length > 0) {
						rows.push(row);
					}
				}
				$scope.data.rows = rows;
			}
		});

		$scope.channels = [];
		ChannelService.list().then(function (data) {
			$scope.channels = data;
		});

		$scope.row = undefined;
		$scope.addRow = function () {
			$scope.row = {
				type: 1,
				channel: undefined
			}
		};

		$scope.set = function () {
			if (!$scope.row.channel) {
				return;
			}
			if ($scope.data.rows.length === 0) {
				$scope.data.rows.push({
					type: $scope.row.type,
					channels: [$scope.row.channel]
				});
			} else {
				var last = _.last($scope.data.rows);
				if (last.type === 1) {
					$scope.data.rows.push({
						type: $scope.row.type,
						channels: [$scope.row.channel]
					});
				} else {
					if (last.channels.length === 0 || last.channels.length === 2) {
						$scope.data.rows.push({
							type: $scope.row.type,
							channels: [$scope.row.channel]
						});
					} else {
						last.channels.push($scope.row.channel);
					}
				}
			}
			$scope.row = undefined;
		};

		$scope.cancel = function () {
			$scope.row = undefined;
		};

		$scope.displayLast = function () {
			if ($scope.data.rows.length === 0) {
				return true;
			} else {
				var last = _.last($scope.data.rows);
				if (last.type === 1) {
					return true;
				} else {
					return last.channels.length === 2;
				}
			}
		};

		$scope.openRow = function (rowIndex, channelIndex) {
			var selectedRow = $scope.data.rows[rowIndex];
			$scope.row = {
				exist: true,
				rowIndex: rowIndex,
				channelIndex: channelIndex,
				type: selectedRow.type,
				channel: selectedRow.channels[channelIndex]
			}
		};

		$scope.delete = function () {
			if ($scope.row.type === 1) {
				$scope.data.rows.splice($scope.row.rowIndex, 1);
			} else {
				$scope.data.rows[$scope.row.rowIndex].channels.splice($scope.row.channelIndex, 1);
				if ($scope.data.rows[$scope.row.rowIndex].channels.length === 0) {
					$scope.data.rows.splice($scope.row.rowIndex, 1);
				} else {
					$scope.data.rows[$scope.row.rowIndex].type = 1;
				}
			}
		};

		$scope.reset = function () {
			$scope.data.rows[$scope.row.rowIndex].type = $scope.row.type;
			$scope.data.rows[$scope.row.rowIndex].channels[$scope.row.channelIndex] = $scope.row.channel;
		};

		$scope.submit = function () {
			if ($scope.data.rows.length === 0) {
				return;
			}
			ChannelLayoutService.save($scope.data).then(function () {
				AlertService.success('保存成功');
			});
		}
	}
});