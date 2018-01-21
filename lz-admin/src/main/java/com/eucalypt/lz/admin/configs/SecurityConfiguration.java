package com.eucalypt.lz.admin.configs;

import com.eucalypt.framework.core.configs.BaseSecurityConfiguration;
import com.eucalypt.framework.core.filter.StatelessAuthenticationFilter;
import com.eucalypt.lz.commons.services.AdminService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends BaseSecurityConfiguration {

	private final AdminService adminService;

	public SecurityConfiguration() {
		super();
		this.adminService = new AdminService();
		init(this.adminService);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().and()
				.exceptionHandling().and()
				.anonymous().and()
				.authorizeRequests()

				// Allow anonymous resource requests
				.antMatchers("/").permitAll()
				.antMatchers("/calculator_worker_sha1.js").permitAll()
				.antMatchers("/login").permitAll()
				.antMatchers("/message/**").permitAll()
				.antMatchers("/favicon.ico").permitAll()
				.antMatchers("/js/**").permitAll()
				.antMatchers("/font/**").permitAll()
				.antMatchers("/fonts/**").permitAll()
				.antMatchers("/img/**").permitAll()
				.antMatchers("/images/**").permitAll()
				.antMatchers("/css/**").permitAll()
				.antMatchers("/templates/**").permitAll()
				.antMatchers("/bower_components/**").permitAll()
				.antMatchers("/weixin/**").permitAll()
				// Allow anonymous logins
				.antMatchers("/auth/**").permitAll()
				.antMatchers("/unauth/**").permitAll()
				.antMatchers("/video/message").permitAll()
				.antMatchers("/weixin/message").permitAll()

				// All other request need to be authenticated
				.anyRequest().authenticated().and()
				.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint()).and()
				// Custom Token based authentication based on the header previously given to the client
				.addFilterBefore(new StatelessAuthenticationFilter(tokenAuthenticationService()),
						UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	public AdminService adminService() {
		return adminService;
	}

}
