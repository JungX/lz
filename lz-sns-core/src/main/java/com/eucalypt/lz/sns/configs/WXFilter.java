package com.eucalypt.lz.sns.configs;

import com.eucalypt.framework.weixin.entity.WeixinUserAccessToken;
import com.eucalypt.framework.weixin.entity.WeixinUserInfoBean;
import com.eucalypt.framework.weixin.service.IWeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.framework.weixin.service.WeixinSettingService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpMethod;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by zhaoyang on 17/4/27.
 */
public class WXFilter extends GenericFilterBean {
	private static final Logger logger = LoggerFactory.getLogger(WXFilter.class);

	private WeixinDataServiceFactory weixinDataServiceFactory;

	private WeixinSettingService weixinSettingService;

	@Override
	protected void initFilterBean() throws ServletException {
		this.weixinDataServiceFactory = WebApplicationContextUtils
				.getRequiredWebApplicationContext(getFilterConfig()
						.getServletContext()).getBean(WeixinDataServiceFactory.class);

		this.weixinSettingService = WebApplicationContextUtils
				.getRequiredWebApplicationContext(getFilterConfig()
						.getServletContext()).getBean(WeixinSettingService.class);
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		httpResponse.addHeader("Access-Control-Allow-Origin", "*");
		if (HttpMethod.OPTIONS.matches(httpRequest.getMethod()) && httpRequest.getHeader("Access-Control-Request-Method") != null) {
			httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, HEAD, DELETE, OPTIONS");
			httpResponse.addHeader(
					"Access-Control-Allow-Headers", "Content-Type," +
							"accept," +
							"Origin," +
							"Access-Control-Request-Method," +
							"Access-Control-Request-Headers," +
							"X-AUTH-TOKEN");
			httpResponse.addHeader("Access-Control-Max-Age", "1");
			chain.doFilter(request, response);
		} else {
			chain.doFilter(request, response);
		}
	}

	private String getOpenId(HttpServletRequest httpRequest) {
		if(httpRequest.getCookies() != null) {
			for (Cookie cookie : httpRequest.getCookies()) {
				if (cookie.getName().equals("openId")) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}
}
