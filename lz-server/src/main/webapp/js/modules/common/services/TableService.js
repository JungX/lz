define(function () {
	return ['RestService', TableService];
	function TableService(RestService) {

		function TableService() {
			var tableCtrl = undefined;
			var url = undefined;
			var condition = undefined;

			this.init = function (scope, _url, _condition) {
				url = _url;
				condition = _condition;
				scope.pipe = function (tableState, ctrl) {
					tableCtrl = ctrl;
					var pagination = tableState.pagination;
					var start = pagination.start || 0;
					var number = pagination.number || 10;
					if (!!url) {
						condition.start = start;
						condition.number = number;
						scope.isLoading = true;
						RestService.post(url, condition).then(function (result) {
							tableState.pagination.numberOfPages = result.numberOfPages;
							scope.isLoading = false;
							scope.datas = result.values;
						});
					}
				};
			};

			this.display = function (_url, _condition) {
				url = _url;
				condition = _condition;
				var tableState = tableCtrl.tableState();
				tableCtrl.pipe(tableState);
			};
		}

		return new TableService();
	}
});