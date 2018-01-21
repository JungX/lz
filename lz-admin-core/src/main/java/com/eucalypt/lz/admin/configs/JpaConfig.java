package com.eucalypt.lz.admin.configs;

import com.eucalypt.framework.jpa.EucalyptDataSource;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.Properties;


@Configuration
@PropertySource("classpath:configs.properties")
@EnableJpaRepositories(basePackages = "com.eucalypt.lz.commons")
public class JpaConfig {



		private static final String PROPERTY_NAME_HIBERNATE_DIALECT = "hibernate.dialect";
		private static final String PROPERTY_NAME_HIBERNATE_FORMAT_SQL = "hibernate.format_sql";
		private static final String PROPERTY_NAME_HIBERNATE_HBM2DDL_AUTO = "hibernate.hbm2ddl.auto";
		private static final String PROPERTY_NAME_HIBERNATE_SHOW_SQL = "hibernate.show_sql";


		@Resource
		private Environment environment;



		@Bean
		public JpaTransactionManager transactionManager() throws ClassNotFoundException {
			JpaTransactionManager transactionManager = new JpaTransactionManager();

			transactionManager.setEntityManagerFactory(entityManagerFactoryBean().getObject());

			return transactionManager;
		}

		@Bean(name="entityManagerFactory")
		public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean() throws ClassNotFoundException {
			LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
			AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(EucalyptDataSource.class);
			entityManagerFactoryBean.setDataSource((DataSource) context.getBean("dataSource"));
			entityManagerFactoryBean.setPackagesToScan("com.eucalypt.lz.commons");
			entityManagerFactoryBean.setJpaVendorAdapter(getJpaVendorAdapter());

			Properties jpaProterties = new Properties();
			jpaProterties.put(PROPERTY_NAME_HIBERNATE_FORMAT_SQL, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_FORMAT_SQL));
			jpaProterties.put(PROPERTY_NAME_HIBERNATE_HBM2DDL_AUTO, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_HBM2DDL_AUTO));
			jpaProterties.put(PROPERTY_NAME_HIBERNATE_SHOW_SQL, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_SHOW_SQL));

			entityManagerFactoryBean.setJpaProperties(jpaProterties);

			return entityManagerFactoryBean;
		}


		public JpaVendorAdapter getJpaVendorAdapter(){
			HibernateJpaVendorAdapter hibernateJpaVendorAdapter = new HibernateJpaVendorAdapter();
			hibernateJpaVendorAdapter.setDatabase(Database.MYSQL);
			hibernateJpaVendorAdapter.setShowSql(false);
			hibernateJpaVendorAdapter.setGenerateDdl(true);
			hibernateJpaVendorAdapter.setDatabasePlatform(environment.getProperty(PROPERTY_NAME_HIBERNATE_DIALECT));
			return hibernateJpaVendorAdapter;
		}


}
