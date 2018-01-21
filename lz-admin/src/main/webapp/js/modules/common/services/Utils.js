define([], function () {
	return [Utils];
	function Utils() {
		return {
			uuid: function () {
				function s4() {
					return Math.floor((1 + Math.random()) * 0x10000)
						.toString(16)
						.substring(1);
				}

				return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
					s4() + '-' + s4() + s4() + s4();
			},

			number: function () {
				return moment().format('YYMMDD') + Math.floor((Math.random() * 10000) + 1) +
					Math.floor((1 + Math.random()) * 0x100).toString(16).substring(1).toUpperCase();
			}
		};
	}
});