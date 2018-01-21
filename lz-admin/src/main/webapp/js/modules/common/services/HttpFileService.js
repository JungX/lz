define(
	function () {
		return ['$q', '$timeout', '$http', 'Upload', 'FD_HOST', 'FD_CONTEXT', 'FD_API_URL', 'AlertService', HttpFileService];

		function HttpFileService($q, $timeout, $http, Upload, FD_HOST, FD_CONTEXT, FD_API_URL, AlertService) {
			return {
				upload: function (uri, files, data) {
					var deferred = $q.defer();
					Upload.upload({
						url: FD_HOST + FD_CONTEXT + FD_API_URL + uri,
						method: 'POST',
						headers: {
							'X-AUTH-TOKEN': sessionStorage.getItem("token")
						},
						data: {
							files: files,
							data: data
						}
					}).then(function (response) {
						$timeout(function () {
							if (response.data.resultType == 'ERROR') {
								AlertService.error(response.data.message);
								deferred.reject();
							} else {
								deferred.resolve(response.data.result);
								AlertService.success('上传成功');
							}
						});
					}, function (response) {
						if (response.status > 0) {
							AlertService.error(response.data);
							deferred.reject();
						}
					});
					return deferred.promise;
				},
				download: function (uri, method, downloadFilename,data) {
					var deferred = $q.defer();
					$http({
						url: FD_HOST + FD_CONTEXT + uri,
						method: method || "GET",
						headers: {'X-AUTH-TOKEN': sessionStorage.getItem('token')},
						responseType: 'arraybuffer',
						data:data
					}).success(function (data, status, headers) {
						var blob = new Blob([data], {type: headers('Content-Type')});
						var objectUrl = URL.createObjectURL(blob);
						angular.element('<a/>').attr({
							href: objectUrl,
							target: '_blank',
							download: downloadFilename || headers('filename')
						})[0].click();
						deferred.resolve();
					}).error(function (data, status, headers, config) {
						console.error(data);
						deferred.reject(data, status);
					});
					return deferred.promise;
				}
			};
		}
	});