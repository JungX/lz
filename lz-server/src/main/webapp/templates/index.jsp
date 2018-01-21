<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="zh-cn">
<meta charset="utf-8"/>
<head>
	<title>乐众高尔夫</title>
	<link rel="icon" href="images/favicon.ico" type="image/x-icon"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-touch-fullscreen" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="format-detection" content="telephone=no">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp&key=H4ABZ-HZGRX-3QU4M-ZJP67-3G4ZE-QNBBN"></script>
	<script charset="utf-8" src="http://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	<%
		String debug = System.getProperty("debug");
		if (debug == null) {
			out.println("<link href=\"css/styles.css\" type=\"text/css\" rel=\"stylesheet\">");
			out.println("<script type=\"text/javascript\" src=\"js/sh.js\"></script>");
		} else {
			out.println("<link href=\"css/styles.css\" type=\"text/css\" rel=\"stylesheet\">");
			out.println("<script data-main=\"js/require.config.js\" type=\"text/javascript\" src=\"bower_components/requirejs/require.js\"></script>");
		}
	%>
</head>
<body ontouchstart web-app ui-view>
</body>
</html>