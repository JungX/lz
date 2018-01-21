define(function () {
	return ['NewsService', 'AnchorService', newsList];
	function newsList(NewsService, AnchorService) {
		return {
			restrict: 'E',
			scope: true,
			templateUrl: 'js/modules/homepage/templates/news.list.html',
			link: function ($scope) {

				var condition = {
					start: 0,
					number: AnchorService.getNumber(5, 5),
					sortField: '-createdTime',
					total: -1
				};

				$scope.datasLoading = false;
				$scope.datasFinished = false;
				$scope.datas = [];
				$scope.listDatas = function () {
					if ($scope.datasLoading || $scope.datasFinished) {
						return;
					}
					$scope.datasLoading = true;
					NewsService.homepage(condition).then(function (result) {
						condition.start = condition.start + result.values.length;
						if (condition.total === -1) {
							condition.total = result.total;
						}
						for (var i in result.values) {
							$scope.datas.push(result.values[i]);
						}
						$scope.datasLoading = false;
						$scope.datasFinished = condition.total === condition.start;
						AnchorService.go();
					});
				};
			}
		};
	}
});