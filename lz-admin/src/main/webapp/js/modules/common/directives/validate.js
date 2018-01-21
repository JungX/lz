/**
 * Created by zhaoyang on 16/11/15.
 */
define(function () {
	return ['$q', validate];
	function validate($q) {
		return {
			restrict: 'A',
			link: function ($scope, element, attr) {
				if (!$scope.functions) {
					$scope.functions = [];
				}
				$scope.functions.push(function () {
					var name = attr.validate;
					if (attr.notEmpty) {
						if (_.isUndefined(element[0].value) || _.isEmpty(element[0].value)) {
							element.focus();
							return name + '不能为空';
						} else {
							return null;
						}
					}
				});

				$scope.validate = function () {
					var deferred = $q.defer();
					for (var i = 0; i < $scope.functions.length; i++) {
						var waring = $scope.functions[i]();
						if (waring !== null) {
							deferred.reject(waring);
							return deferred.promise;
						}
					}
					deferred.resolve();
					return deferred.promise;
				};
			}
		};
	}
});