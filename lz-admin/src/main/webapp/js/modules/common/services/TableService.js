define(function () {
	return ['RestService', TableService];
	function TableService(RestService) {

		function TableService() {
			var tableCtrl, url, condition;
			var cache = {};

			this.init = function (scope, _url, _condition, _cache) {
				url = _url;
				condition = _condition;
				scope.pipe = function (tableState, ctrl) {
					tableCtrl = ctrl;
					if (_cache) {
						cache[scope.$id] = {
							ctrl: ctrl
						};
					}
					var pagination = tableState.pagination;
					var start = pagination.start || 0;
					var number = pagination.number || 10;
					if (!!url) {
						condition.start = start;
						condition.number = number;
						condition.sortField = condition.sortField || '-createdTime';
						scope.isLoading = true;
						RestService.post(url, condition).then(function (result) {
							tableState.pagination.numberOfPages = result.numberOfPages;
							scope.isLoading = false;
							scope.datas = result.values;
						});
					}
				};
			};

			this.display = function (_url, _condition, scope) {
				url = _url;
				condition = _condition;
				if (!!scope) {
					var ctrl = cache[scope.$id].ctrl;
					ctrl.pipe(ctrl.tableState());
				} else {
					var tableState = tableCtrl.tableState();
					tableCtrl.pipe(tableState);
				}
			};
		}

		return new TableService();
	}
});