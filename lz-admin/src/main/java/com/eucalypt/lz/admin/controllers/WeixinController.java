package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.annotation.RestfulComment;
import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.weixin.mp.aes.XMLParse;
import com.eucalypt.framework.weixin.service.WeixinMessageService;
import com.eucalypt.framework.weixin.utils.Signature;
import com.eucalypt.framework.weixin.utils.WeixinConstants;
import com.eucalypt.lz.commons.beans.SystemSetting;
import com.eucalypt.lz.commons.beans.SystemSettingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("weixin/message")
public class WeixinController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(WeixinController.class);

	@Autowired
	private SystemSettingService systemSettingService;

	@Autowired
	private WeixinMessageService messageService;

	@RequestMapping(method = RequestMethod.GET)
	public void serviceVerify(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String signature = request.getParameter("signature");
		String timestamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echostr = request.getParameter("echostr");
		if (logger.isDebugEnabled()) {
			String[] datas = new String[]{
					signature, timestamp, nonce, echostr
			};
			logger.debug("\t\n nsignature:{} \t\n timestamp:{} \t\n nonce:{} \t\n echostr:{}", datas);
		}

		PrintWriter out = response.getWriter();
		if (Signature.checkSignature(messageService.getToken(), signature, timestamp, nonce)) {
			out.print(echostr);
			out.close();
			logger.info("\t\n Authentication success.");
			return;
		}
		out.close();
		logger.info("\t\n Authentication final.");
	}

	@RequestMapping(method = RequestMethod.POST)
	@RestfulComment("微信消息推送入口")
	public void msgCallback(@RequestBody String postData, HttpServletResponse response) {
		PrintWriter out = null;
		try {
			response.setCharacterEncoding("utf-8");
			out = response.getWriter();
			SystemSetting systemSetting = systemSettingService.get();
			Map<String, String> dataMap = XMLParse.parseXmlStringToMap(postData);
			String msgType = dataMap.get(WeixinConstants.MSG_CALLBACK_ELEMENT_MSGTYPE);
			if (WeixinConstants.RECEIVE_MESSAGE_TYPE_EVENT.equals(msgType)) {
				String eventType = dataMap.get(WeixinConstants.MSG_CALLBACK_ELEMENT_EVENT);
				String openId = dataMap.get(WeixinConstants.MSG_CALLBACK_ELEMENT_FROMUSERNAME);
				if (WeixinConstants.EVENT_SUBSCRIBE.equals(eventType)) {
					returnMessage(response.getWriter(), dataMap, systemSetting.getWeixinWelcomeWord());
				}
			} else if (WeixinConstants.SEND_MESSAGE_TYPE_TEXT.equals(msgType)) {
				returnMessage(response.getWriter(), dataMap, systemSetting.getWeixinWelcomeWord());
			}
		} catch (Exception e) {
			out.print("");
			logger.error(e.getMessage(), e);
		} finally {
			if (out != null) {
				out.close();
			}
		}
	}

	private void returnMessage(PrintWriter out, Map<String, String> dataMap, String content) {
		StringBuffer xml = new StringBuffer()
				.append("<xml>")
				.append("<ToUserName><![CDATA[").append(dataMap.get("FromUserName")).append("]]></ToUserName>")
				.append("<FromUserName><![CDATA[").append(dataMap.get("ToUserName")).append("]]></FromUserName>")
				.append("<CreateTime>").append(dataMap.get("CreateTime")).append("</CreateTime>")
				.append("<MsgType><![CDATA[").append("text").append("]]></MsgType>")
				.append("<Content><![CDATA[").append(content).append("]]></Content>")
				.append("</xml>");
		if (logger.isInfoEnabled()) {
			logger.info("Message Transpond:{}", xml.toString());
		}
		out.println(xml.toString());
	}

	@RequestMapping(value = "pay", method = RequestMethod.GET)
	public void pay(HttpServletRequest request, HttpServletResponse response) throws IOException {

	}
}
