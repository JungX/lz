<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="zh-cn">
<meta charset="utf-8"/>
<head>
	<title>Admin Management</title>
	<link rel="icon" href="images/logo.ico" type="image/x-icon"/>
    <script charset="utf-8" src="https://map.qq.com/api/js?v=2.exp&key=H4ABZ-HZGRX-3QU4M-ZJP67-3G4ZE-QNBBN"></script>
	<script charset="utf-8" src="http://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"></script>
	<script src="//cdn.bootcss.com/moment.js/2.18.1/moment-with-locales.min.js"></script>
	<%--<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=rzGi9U8zZR5npMcO55PHKan8I1x45pst">--%>
	<%
		String debug = System.getProperty("debug");
		if (debug == null) {
			out.println("<link href=\"css/styles.css\" type=\"text/css\" rel=\"stylesheet\">");
			out.println("<script type=\"text/javascript\" src=\"js/ad.js\"></script>");
		} else {
			out.println("<link href=\"css/styles.css\" type=\"text/css\" rel=\"stylesheet\">");
			out.println("<script data-main=\"js/require.config.js\" type=\"text/javascript\" src=\"bower_components/requirejs/require.js\"></script>");
		}
	%>
</head>
<body class="skin-blue sidebar-mini" web-app ui-view>

121231123
</body>
</html>