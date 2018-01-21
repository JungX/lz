define([], function () {
	return ['$scope', '$state', '$http', '$rootScope', 'AccountService', 'Utils', WalletCtrl];

	function WalletCtrl($scope, $state, $http, $rootScope, AccountService, Utils) {
		AccountService.getPledge().then(function (data) {
			$scope.data = data;
		})
	}
});