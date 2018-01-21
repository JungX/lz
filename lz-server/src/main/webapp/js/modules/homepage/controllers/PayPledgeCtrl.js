define([], function () {
	return ['$scope', '$state', 'PayService', 'ConfirmService', PayPledgeCtrl];

	function PayPledgeCtrl($scope, $state, PayService, ConfirmService) {
		$scope.goPay = function () {
			ConfirmService.open('确认支付押金？', '支付押金500元').then(function () {
				var data = {

				}
				PayService.pay()
			});
		};
	}
});