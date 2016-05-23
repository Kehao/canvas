$.ajax({
	type: 'GET',
	url: 'http://h5.gitos.org/migu-book/sign.php',
	data: {
		url: window.location.href
	},
	dataType: 'json',
	success: function(data) {
		var jssdk_info_obj = data;

	    wx.config({
	        debug: false,
	        appId: jssdk_info_obj.appid,
	        // appId: "wx7ce0287e0e1951d8",
	        timestamp: jssdk_info_obj.timestamp,
	        nonceStr: jssdk_info_obj.noncestr,
	        signature: jssdk_info_obj.signature,
	        jsApiList: [
	            'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo'
	        ]
	    });


	    var shareInfo = {
	    	title: "IN-生活数据馆",
	        desc: "IN-生活数据馆--IN-生活数据官--IN-生活数据官",
	        link: location.href,
	        imgUrl: 'http://h5.gitos.org/p03_in/image/share-icon.png'
	    }
	    

	    wx.ready(function() {
	        // 2. 分享接口
	        // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareAppMessage(shareInfo);

	        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareTimeline(shareInfo);

	        // 2.3 监听“分享到QQ”按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareQQ(shareInfo);

	        // 2.4 监听“分享到微博”按钮点击、自定义分享内容及分享结果接口
	        wx.onMenuShareWeibo(shareInfo);

	    });
	},
	error: function(xhr, type) {}
})
