<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="org.springframework.security.crypto.keygen.KeyGenerators" %>
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
	<%
		String debug = System.getProperty("debug");
		String random = KeyGenerators.string().generateKey();
		if (debug == null) {
			out.println("<link href=\"css/styles.ad.css?random=" + random + "\" type=\"text/css\" rel=\"stylesheet\">");
			out.println("<script type=\"text/javascript\" src=\"js/ad.js?random=" + random + "\"></script>");
		} else {
			out.println("<link href=\"css/styles.ad.css\" type=\"text/css\" rel=\"stylesheet\">");
			out.println("<script data-main=\"js/require.config.ad.js\" type=\"text/javascript\" src=\"bower_components/requirejs/require.js\"></script>");
		}
	%>
</head>
<body web-app ui-view>
</body>
</html>