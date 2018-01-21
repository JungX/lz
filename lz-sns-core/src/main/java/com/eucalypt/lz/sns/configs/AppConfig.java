package com.eucalypt.lz.sns.configs;

import com.eucalypt.framework.core.configs.BaseAppConfig;
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
	public WeixinDataServiceFactory weixinDataServiceFactory() {
		WeixinDataServiceFactory weixinDataServiceFactory = new WeixinDataServiceFactory();
		weixinDataServiceFactory.setWeixinDataService(weixinDataService());
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

