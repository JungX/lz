define([], function () {
	return ['$scope', '$state', ShopCtrl];

	function ShopCtrl($scope, $state) {
		$scope.shopId = $state.params.shopId;
		$scope.tabIndex = !!$state.current.data ? $state.current.data.selectedTab : 0;
	}
});