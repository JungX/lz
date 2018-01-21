define([], function () {
	return ['$scope', '$state', 'AlertService', 'DeviceService', 'LEVELS', '$timeout', DeviceLocationCtrl];

	function DeviceLocationCtrl($scope, $state, AlertService, DeviceService, LEVELS, $timeout) {
		var deviceId = $state.params.deviceId;
		$scope.levels = LEVELS;

		$scope.exit = function () {
			$state.go('main.device.list')
		};

		var geocoder, map, marker, center, lng, lat, citylocation = null;

		var initMap = function () {
			map = new qq.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 13
			});
			map.setOptions({
				keyboardShortcuts: false,
				scrollwheel: false
			});
			geocoder = new qq.maps.Geocoder({
				complete: function (result) {
					var lng = result.detail.location.lng;
					var lat = result.detail.location.lat;
					$scope.data.coordinates = [lng, lat];
					$scope.$apply();
				}
			});
			qq.maps.event.addListener(map, 'click', function (event) {
				setMarker(event.latLng);
				geocoder.getAddress(event.latLng);
			});
		};

		var init = function () {
			if (!!$scope.data.coordinates) {
				lng = $scope.data.coordinates[0];
				lat = $scope.data.coordinates[1];
				center = new qq.maps.LatLng(lat, lng);
				initMap();
			} else {
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
			}
		};

		var setMarker = function (center) {
			if (marker) {
				marker.setMap(null);
			}
			marker = new qq.maps.Marker({
				position: center,
				animation: qq.maps.MarkerAnimation.BOUNCE,
				draggable: true,
				map: map
			});
		};

		if (!!deviceId) {
			DeviceService.get(deviceId).then(function (data) {
				$scope.data = data;
				$timeout(function () {
					init();
					if (!!$scope.data.coordinates) {
						setMarker(center);
					}
				});
			});
		}

		$scope.setLocation = function () {
			DeviceService.setLocation($scope.data.id, $scope.data.coordinates).then(function () {
				AlertService.success('位置设置成功');
			});
		};
	}
});