define(function () {
	return ['TableService', 'ModalService', '$q', PageSelectService];
	function PageSelectService(TableService, ModalService, $q) {
		return {
			open: function () {
				var deferred = $q.defer();
				ModalService.showModal({
					templateUrl: "js/modules/sys/templates/page.select.html",
					controller: function ($scope, close) {
						$scope.condition = {
							and: true,
							start: 0,
							number: 10
						};
						TableService.init($scope, 'page/list/paged', $scope.condition);

						$scope.select = function (data) {
							close(data)
						};

						$scope.cancel = function () {
							close();
						};

					}
				}).then(function (modal) {
					modal.close.then(function (selected) {
						if (!!selected) {
							deferred.resolve(selected);
						}
					});
				});
				return deferred.promise;
			}
		};
	}
});