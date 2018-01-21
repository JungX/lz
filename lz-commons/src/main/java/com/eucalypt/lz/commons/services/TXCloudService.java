package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.utils.Utils;
import net.sf.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.MessageFormat;
import java.util.concurrent.ExecutionException;

/**
 * Created by zhaoyang on 17/5/4.
 */
public class TXCloudService {
	private static final Logger logger = LoggerFactory.getLogger(TXCloudService.class);
	private static final String SMS_APP_KEY = "6de10d3243290c9bbd5026771ab95bf7";
	private static final String SMS = "https://yun.tim.qq.com/v5/tlssmssvr/sendisms?sdkappid=1400049108&random={0}";
	private static final String SMS_SIGN_TEMPLATE = "appkey={0}&random={1}&time={2}&tel={3}";

	public JSONObject sendSMS(String phone, String msg) throws NoSuchAlgorithmException, InterruptedException, ExecutionException, IOException {
		String random = Integer.toString((int) (Math.random() * 100000));
		long timestamp = System.currentTimeMillis() / 1000;
		String timestampStr = Long.toString(timestamp);
		String tel = "+86" + phone;
		String signStr = MessageFormat.format(SMS_SIGN_TEMPLATE, SMS_APP_KEY, random, timestampStr, tel);
		String sign = strToHash(signStr);
		System.out.println(signStr);
		System.out.println(sign);
		String url = MessageFormat.format(SMS, random);
		System.out.println(url);
		JSONObject data = new JSONObject();
//		JSONObject tel = new JSONObject();
//		tel.put("nationcode", "86");
//		tel.put("mobile", phone);
		data.put("tel", tel);
		data.put("type", 0);
		data.put("msg", msg);
		data.put("sig", sign);
		data.put("time", timestamp);
		System.out.println(data.toString());
		String response = Utils.httpPost(url, "utf-8", data.toString());
		return JSONObject.fromObject(response);
	}

	private String strToHash(String str) throws NoSuchAlgorithmException {
		MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
		byte[] inputByteArray = str.getBytes();
		messageDigest.update(inputByteArray);
		byte[] resultByteArray = messageDigest.digest();
		return byteArrayToHex(resultByteArray);
	}

	private String byteArrayToHex(byte[] byteArray) {
		char[] hexDigits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'};
		char[] resultCharArray = new char[byteArray.length * 2];
		int index = 0;
		for (byte b : byteArray) {
			resultCharArray[index++] = hexDigits[b >>> 4 & 0xf];
			resultCharArray[index++] = hexDigits[b & 0xf];
		}
		return new String(resultCharArray);
	}

}
