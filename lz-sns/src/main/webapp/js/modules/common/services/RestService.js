define(
	function () {
		return ['$q', 'Restangular', 'AlertService', RestService];
		function RestService($q, Restangular, AlertService) {
			return {
				post: function (uri, data) {
					var deferred = $q.defer();
					Restangular.all(uri).post(data).then(function (result) {
						deferred.resolve(result.result);
					}, function (error) {
						if (error.errormessage) {
							AlertService.error(error.errormessage);
						} else {
							console.error('运行时发生错误');
						}
						deferred.reject(error);
					});
					return deferred.promise;
				}
			};
		}
	});