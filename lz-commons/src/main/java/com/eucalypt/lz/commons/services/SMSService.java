package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.cache.CacheFactory;
import com.eucalypt.framework.core.exception.MessageException;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.text.MessageFormat;
import java.util.Random;
import java.util.concurrent.*;

/**
 * Created by zhaoyang on 16/4/20.
 */
public class SMSService {
	private static final Logger logger = LoggerFactory.getLogger(SMSService.class);
	private static final String RANDOM_STRING = "012345678909876543210";
	private static final ExecutorService exec = Executors.newFixedThreadPool(128);
	private static final int RANDOM_CODE_LENGTH = 6;
	private static final int EXPIRE_SECONDS_CODE = 60 * 30;
	private static final int EXPIRE_SECONDS_COUNT = 60 * 60;
	private static final String CACHE_PREFIX_COUNT = "CODE_COUNT@";
	private static final String CACHE_PREFIX_CODE = "CODE@";
	private static final String ERROR_MESSAGE_INFO_ERROR = "501"; //验证信息不正确
	private static final String ERROR_MESSAGE_CODE_ERROR = "502"; //验证码不正确
	private static final String ERROR_MESSAGE_CODE_EXPIRED = "503"; //验证码已过期
	private static final String ERROR_MESSAGE_TIMES_LIMITED = "504"; //1小时之内发送验证码不能超过10次
	private static final String CONTENT_TEMPLATE = "{0}为您验证码。如非本人操作，请忽略本短信。";
	private Random random = new Random();
	@Autowired
	private CacheFactory<Object> cacheFactory;
	@Autowired
	private TXCloudService txCloudService;

	public String getRandomString() {
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < RANDOM_CODE_LENGTH; i++) {
			sb.append(RANDOM_STRING.charAt(random.nextInt(RANDOM_STRING
					.length())));
		}
		return sb.toString();
	}

	public boolean verifySMSCode(String phoneNumber, String code) {
		if (code == null || phoneNumber == null) {
			throw new MessageException("验证信息不正确");
		}
		if (cacheFactory.getCache().exist(CACHE_PREFIX_CODE + phoneNumber)) {
			if (code.equalsIgnoreCase((String) cacheFactory.getCache().get(CACHE_PREFIX_CODE + phoneNumber))) {
				cacheFactory.getCache().del(CACHE_PREFIX_CODE + phoneNumber);
				return true;
			} else {
				throw new MessageException("验证码不正确");
			}
		} else {
			throw new MessageException("验证码已过期");
		}
	}

	public String sendSMSCode(String phoneNumber) throws ExecutionException, InterruptedException, IOException {
		if (cacheFactory.getCache().exist(CACHE_PREFIX_COUNT + phoneNumber)) {
			Integer count = cacheFactory.getCache().getIntegerValue(CACHE_PREFIX_COUNT + phoneNumber);
			if (count > 10) {
				throw new MessageException("1小时之内发送验证码不能超过10次");
			}
		}
		String code;
		if (cacheFactory.getCache().exist(CACHE_PREFIX_CODE + phoneNumber)) {
			code = (String) cacheFactory.getCache().get(CACHE_PREFIX_CODE + phoneNumber);
		} else {
			code = getRandomString();
		}
		if (Boolean.getBoolean("debug")) {
			putCodeToCache(phoneNumber, code);
		} else {
			Future<String> future = exec.submit(new SendThread(phoneNumber, code));
			try {
				String errorMessage = future.get(30, TimeUnit.SECONDS);
				throw new MessageException(errorMessage);
			} catch (TimeoutException e) {
				logger.error(e.getMessage(), e);
			}
		}
		return code;
	}

	private void putCodeToCache(String phoneNumber, Object code) {
		if (logger.isInfoEnabled()) {
			logger.info("SMS Code>>>" + phoneNumber + ":" + code);
		}
		cacheFactory.getCache().set(CACHE_PREFIX_CODE + phoneNumber, code, EXPIRE_SECONDS_CODE);
		String sendCountKey = CACHE_PREFIX_COUNT + phoneNumber;
		if (cacheFactory.getCache().exist(sendCountKey)) {
			cacheFactory.getCache().incrBy(sendCountKey, 1);
		} else {
			cacheFactory.getCache().setStringValue(sendCountKey, "1", EXPIRE_SECONDS_COUNT);
		}
	}

	private class SendThread implements Callable<String> {

		private String phoneNumber;
		private String code;

		SendThread(String phoneNumber, String code) {
			this.phoneNumber = phoneNumber;
			this.code = code;
		}

		@Override
		public String call() throws Exception {
			try {
				String content = MessageFormat.format(CONTENT_TEMPLATE, code);
				JSONObject result = txCloudService.sendSMS(phoneNumber, content);
				if (!"OK".equals(result.getString("errmsg"))) {
					return result.getString("errmsg");
				} else {
					putCodeToCache(phoneNumber, code);
				}
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
			return null;
		}
	}
}
