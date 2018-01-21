package com.eucalypt.lz.server.controllers;

import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.core.exception.MessageException;
import com.eucalypt.framework.weixin.entity.WeixinUserAccessToken;
import com.eucalypt.framework.weixin.exception.WeixinAccessException;
import com.eucalypt.framework.weixin.service.IWeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.lz.commons.beans.LZLoginBean;
import com.eucalypt.lz.commons.beans.User;
import com.eucalypt.lz.commons.beans.UserPledge;
import com.eucalypt.lz.commons.enums.ProductType;
import com.eucalypt.lz.commons.services.SMSService;
import com.eucalypt.lz.commons.services.UserPledgeService;
import com.eucalypt.lz.commons.services.UserService;
import com.google.common.collect.Maps;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/restful/user")
public class UserController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserPledgeService userPledgeService;

	@Autowired
	private UserService userService;

	@Autowired
	private WeixinDataServiceFactory weixinDataServiceFactory;

	@Autowired
	private SMSService smsService;

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody LZLoginBean loginBean) {
		String code = loginBean.getCode();
		if (code != null) {
			IWeixinDataService weixinDataService = weixinDataServiceFactory.getWeixinDataService();
			WeixinUserAccessToken token = null;
			try {
				token = weixinDataService.fetchUserAccessToken(code);
			} catch (WeixinAccessException e) {
				logger.error(e.getMessage(), e);
				throw new MessageException("获取用户身份时发生错误");
			}
			if (token != null) {
				String openId = token.getOpenid();
				User user = userService.getByOpenId(openId);
				HashMap<String, Object> data = Maps.newHashMap();
				data.put("openId", openId);
				if (user == null) {
					user = new User();
					user.setOpenId(openId);
					user.setUsername(openId);
					user.setPassword(openId);
					userService.create(user);
					data.put("code", 1);
				} else if (user.getPhone() == null) {
					data.put("code", 1);
				} else {
					UserPledge userPledge = userPledgeService.getByUserId(user.getId());
					if (userPledge != null && userPledge.getAmount().intValue() >= ProductType.PLEDGE.getAmount().intValue()) {
						data.put("code", 0);
					} else {
						data.put("code", 2);
					}
				}
				return successResult(data);
			} else {
				throw new MessageException("不能获取用户身份");
			}
		} else {
			throw new MessageException("不能获取用户身份");
		}
	}

	/**
	 * @apiVersion 1.0.0
	 * @api {post} /restful/set/phone setPhone
	 * @apiDescription 设置用户的电话号码
	 * @apiGroup User
	 * @apiParam {String} openId 用户的OpenId.
	 * @apiParam {String} phone 用户的电话号码.
	 * @apiParam {String} code 验证码.
	 * @apiParamExample {json} Request-Example:
	 * {
	 * openId: ${openId},
	 * phone: ${phone},
	 * code: ${code}
	 * }
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * resultType:"SUCCESS"
	 * }
	 * @apiErrorExample {json} Error-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * resultType:"ERROR",
	 * message: ${message}
	 * }
	 */
	@RequestMapping(value = "set/phone", method = RequestMethod.POST)
	public ResponseEntity<String> setPhone(@RequestBody Map<String, String> data) {
		String openId = data.get("openId");
		String phone = data.get("phone");
		String code = data.get("code");
		userService.setPhone(openId, phone, code);
		return successResult();
	}

	/**
	 * @apiVersion 1.0.0
	 * @api {post} /restful/send/sms/{phone} sendSMS
	 * @apiDescription 发送短信验证码
	 * @apiGroup User
	 * @apiParam {String} phone 手机号码.
	 * @apiSuccessExample {json} Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * resultType:"SUCCESS"
	 * }
	 * @apiErrorExample {json} Error-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * resultType:"ERROR",
	 * message: ${message} //aaa
	 * }
	 */
	@RequestMapping(value = "send/sms/{phone}", method = RequestMethod.POST)
	public ResponseEntity<String> sendSMS(@PathVariable("phone") String phone) throws Exception {
		return successResult(smsService.sendSMSCode(phone));
	}

}
