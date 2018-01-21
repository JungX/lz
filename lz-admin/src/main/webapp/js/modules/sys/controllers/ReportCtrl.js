define([], function () {
	return ['$scope', '$state', 'ReportService', 'VideoService', 'AlertService', '$timeout', ReportCtrl];

	function ReportCtrl($scope, $state, ReportService, VideoService, AlertService, $timeout) {
		var id = $state.params.id;
		$scope.exit = function () {
			$state.go('main.sys.reports');
		};

		if (!!id) {
			ReportService.get(id).then(function (data) {
				$scope.data = data;
			});
		}

		$scope.play = function () {
			VideoService.play($scope.data.videoId);
		}
	}
});