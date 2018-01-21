define(function () {
	return ['RestService', '$location', 'AlertService', '$q', 'FD_HOST', 'FD_CONTEXT', WXService];

	function WXService(RestService, $location, AlertService, $q, FD_HOST, FD_CONTEXT) {
		var host = FD_HOST + FD_CONTEXT;
		return {
			init: function () {
				var url = $location.absUrl().split('#')[0];
				RestService.post('wx/sign', {url: url}).then(function (data) {
					wx.config({
						debug: false,
						appId: data.appId,
						timestamp: data.timestamp,
						nonceStr: data.nonceStr,
						signature: data.signature,
						jsApiList: ['openLocation', 'getLocation', 'hideMenuItems', 'chooseImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'previewImage']
					});
					wx.ready(function () {
					});
					wx.error(function (res) {
						console.error(res);
						AlertService.error(res);
					});
				});
			},
			onError: function (fn) {
				wx.error(function (res) {
					fn(res);
				});
			},
			openMap: function (lat, lng, title, address) {
				wx.openLocation({
					latitude: lat,
					longitude: lng,
					name: title,
					address: address,
					scale: 14
				});
			},
			getLocation: function () {
				var deferred = $q.defer();
				wx.getLocation({
					type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function (res) {
						var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						var speed = res.speed; // 速度，以米/每秒计
						var accuracy = res.accuracy; // 位置精度
						deferred.reject(res);
					}
				});
				return deferred.promise;
			},
			chooseImage: function (fn) {
				wx.chooseImage({
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						fn(res.localIds);
					}
				});
			},
			shares: function (options, callback) {
				var opts = $.extend(_default, options);
				//分享给好友
				wx.onMenuShareAppMessage({
					title: opts.title,
					desc: opts.desc,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: opts.title,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
			},
			shareActivity: function (options, callback) {
				var opts = $.extend({
					title: '欢迎加入【有关Uguan】活动',
					desc: '来有关，不孤单！',
					link: 'http://www.uguanlife.com/smmall/activity',
					imgUrl: 'http://www.uguanlife.com/smmall/images/uguan.png'
				}, options);
				//分享给好友
				wx.onMenuShareAppMessage({
					title: opts.title,
					desc: opts.desc,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: opts.title,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
			},
			shareCommunity: function (options, callback) {
				var opts = $.extend({
					title: '欢迎加入【有关Uguan】社区',
					desc: '爱分享，来有关！',
					link: 'http://www.uguanlife.com/smmall/community',
					imgUrl: 'http://www.uguanlife.com/smmall/images/uguan.png'
				}, options);
				//分享给好友
				wx.onMenuShareAppMessage({
					title: opts.title,
					desc: opts.desc,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: opts.title,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
			},
			shareProduct: function (options, callback) {
				var opts = $.extend(_default, options);
				//分享给好友
				wx.onMenuShareAppMessage({
					title: opts.title,
					desc: opts.desc,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
				//分享到朋友圈
				wx.onMenuShareTimeline({
					title: opts.title,
					link: opts.link,
					imgUrl: opts.imgUrl,
					success: function () {
						if (callback) callback()
					}
				});
			},
			previewImage: function (list, index) {
				wx.previewImage({
					current: list[index],
					urls: list
				});
			},
			oauth2: function (uri) {
				var encodeURI = encodeURIComponent(host + uri);
				location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7ae39a1204cf319f&redirect_uri=' + encodeURI + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
			},
			pay: function (data) {
				var deferred = $q.defer();
				WeixinJSBridge.invoke('getBrandWCPayRequest', {
					"appId": data.appId,
					"timeStamp": data.timeStamp,
					"nonceStr": data.nonceStr,
					"package": data.package,
					"signType": data.signType,
					"paySign": data.paySign
					// 微信签名
				}, function (res) {
					if (res.err_msg === "get_brand_wcpay_request:ok") {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				});
				return deferred.promise;
			}
		};
	}
});