package com.eucalypt.lz.admin.configs;

import com.eucalypt.framework.core.configs.BaseAppConfig;
import com.eucalypt.framework.weixin.service.IWeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.framework.weixin.service.WeixinMessageService;
import com.eucalypt.lz.commons.services.*;
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
	public TXCloudService videoCloudService() {
		return new TXCloudService();
	}

	@Bean
	public UserService userService() {
		return new UserService();
	}

	@Bean
	public WeixinMessageService weixinMessageService() {
		return new WeixinMessageService();
	}

	@Bean
	public IWeixinDataService weixinDataService() {
		return new WeixinDataService();
	}

	@Bean
	public WeixinDataServiceFactory weixinDataServiceFactory() {
		WeixinDataServiceFactory weixinDataServiceFactory = new WeixinDataServiceFactory();
		weixinDataServiceFactory.setWeixinDataService(weixinDataService());
		return weixinDataServiceFactory;
	}

}

