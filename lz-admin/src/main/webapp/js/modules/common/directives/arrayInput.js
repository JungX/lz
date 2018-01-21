define(function () {
	return [arrayInput];
	function arrayInput() {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				ngModel: '='
			},
			link: function (scope, element, attr, modelCtrl) {
				modelCtrl.$formatters.push(function () {
					var modelValues = modelCtrl.$modelValue;
					return _.join(modelValues, "，");
				});

				modelCtrl.$parsers.push(function (inputValue) {
					var values = inputValue ? _.split(inputValue, /,|，|,/g) : [];
					return values;
				});
			}
		};
	}
});