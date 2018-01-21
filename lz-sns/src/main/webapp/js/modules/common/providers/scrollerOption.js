define(
	function () {
		return [scrollerOption];
		function scrollerOption() {
			var _option = null;
			this.setOption = function (option) {
				_option = option;
			};

			this.getOption = function () {
				return _option;
			};

			this.$get = [function () {
				return new Option(_option);
			}];
		}

		function Option(option) {
			this.option = option;
		}
	});