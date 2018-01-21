define([], function () {
	return ['$scope', '$state', 'DeviceService', 'ShopService', MapCtrl];

	function MapCtrl($scope, $state, DeviceService, ShopService) {
		var geocoder, map, center = null;
		var markers = [];

		var initMap = function () {
			map = new qq.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 13,
				mapTypeControl: false
			});
			map.setOptions({
				keyboardShortcuts: false,
				scrollwheel: false
			});
			DeviceService.near([center.lng, center.lat]).then(function (data) {
				if (!!data) {
					_.forEach(data, function (device) {
						var lng = device.coordinates[0];
						var lat = device.coordinates[1];
						setMarker(new qq.maps.LatLng(lat, lng), device)
					})
				}
			});
			geocoder = new qq.maps.Geocoder({
				complete: function (result) {
					var lng = result.detail.location.lng;
					var lat = result.detail.location.lat;
					console.dir(result)
				}
			});
			qq.maps.event.addListener(map, 'click', function (event) {
				$scope.shop = null;
			});
		};

		var init = function () {
			var geolocation = new qq.maps.Geolocation("EWABZ-UZUW4-4QCUZ-DPD3I-C2ATQ-PQBL3", "shbm");
			geolocation.getLocation(function (position) {
				var lat = position.lat;
				var lng = position.lng;
				center = new qq.maps.LatLng(lat, lng);
				initMap();
			}, function (e) {
				console.dir(e);
			}, {
				timeout: 9000
			});
		};

		var setMarker = function (position, device) {
			var marker = new qq.maps.Marker({
				position: position,
				map: map
			});
			qq.maps.event.addListener(marker, 'click', function (e) {
				var lng = device.coordinates[0];
				var lat = device.coordinates[1];
				ShopService.get(device.shopId).then(function (data) {
					$scope.shop = data;
				})
			});
			markers.push(marker);
		};

		init();

		$scope.openShop = function () {
			$state.go('main.shop', {shopId: $scope.shop.id});
		};
	}
});