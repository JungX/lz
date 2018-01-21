package com.eucalypt.lz.server.configs;

import com.eucalypt.framework.core.configs.BaseAppConfig;
import com.eucalypt.framework.weixin.service.MockWeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.framework.weixin.service.WeixinPayService;
import com.eucalypt.lz.commons.services.PayService;
import com.eucalypt.lz.commons.services.SMSService;
import com.eucalypt.lz.commons.services.TXCloudService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

import java.util.HashMap;
import java.util.Map;


@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.eucalypt")
@EnableAspectJAutoProxy
public class AppConfig extends BaseAppConfig {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		super.addResourceHandlers(registry);
	}

	@Bean
	public WeixinDataService weixinDataService() {
		return new WeixinDataService();
	}

	@Bean
	public MockWeixinDataService mockWeixinDataService() {
		MockWeixinDataService mockWeixinDataService = new MockWeixinDataService();
		Map<String, String> openIdsMap = new HashMap<String, String>();
		openIdsMap.put("1", "oABxS1HtAjOWBtI_FvkXAW01hfvo");
		mockWeixinDataService.setOpenIdsMap(openIdsMap);
		return mockWeixinDataService;
	}

	@Bean
	public WeixinDataServiceFactory weixinDataServiceFactory() {
		WeixinDataServiceFactory weixinDataServiceFactory = new WeixinDataServiceFactory();
		if (System.getProperty("debug") == null) {
			weixinDataServiceFactory.setWeixinDataService(weixinDataService());
		} else {
			weixinDataServiceFactory.setWeixinDataService(mockWeixinDataService());
		}
		return weixinDataServiceFactory;
	}

	@Bean
	public WeixinPayService weixinPayService() {
		return new WeixinPayService();
	}

	@Bean
	public PayService payService() {
		return new PayService();
	}

	@Bean
	public TXCloudService txCloudService() {
		return new TXCloudService();
	}

	@Bean
	public SMSService smsService() {
		return new SMSService();
	}
}

