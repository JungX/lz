package com.eucalypt.lz.sns.controllers;

import com.eucalypt.framework.core.annotation.RestfulComment;
import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.core.security.UserContext;
import com.eucalypt.framework.weixin.entity.WeixinUserAccessToken;
import com.eucalypt.framework.weixin.exception.WeixinAccessException;
import com.eucalypt.framework.weixin.service.IWeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.lz.commons.beans.SHLoginBean;
import com.eucalypt.lz.commons.beans.User;
import com.eucalypt.lz.commons.enums.Roles;
import com.eucalypt.lz.commons.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RestfulComment(catalog = "登录管理")
public class AuthorizationController extends BaseController {

	@Autowired
	private UserContext userContext;

	@Autowired
	private UserService userService;

	@Autowired
	private WeixinDataServiceFactory weixinDataServiceFactory;

	@RequestMapping(value = "login", method = RequestMethod.POST)
	public ResponseEntity<String> login(@RequestBody SHLoginBean loginBean) throws WeixinAccessException {
		loginBean.setRoles(Roles.user);
		if (loginBean.getWxCode() != null) {
			IWeixinDataService weixinDataService = weixinDataServiceFactory.getWeixinDataService();
			WeixinUserAccessToken token = weixinDataService.fetchUserAccessToken(loginBean.getWxCode());
			if (token != null) {
				String openId = token.getOpenid();
				User user = userService.getByOpenId(openId);
				loginBean.setOpenId(openId);
				if (user != null) {
					return _login(loginBean);
				} else {
					user = new User();
					user.setOpenId(openId);
					userService.create(user);
					return _login(loginBean);
				}
			} else {
				return errorResult("微信登录不正确");
			}
		}
		return errorResult("微信登录不正确");
	}

	private ResponseEntity<String> _login(SHLoginBean loginBean) {
		String loginToken = userContext.login(loginBean);
		if (loginToken != null) {
			Map<String, String> result = new HashMap<String, String>();
			result.put("type", "success");
			result.put("token", loginToken);
			return successResult(result);
		} else {
			return errorResult("微信登录不正确");
		}
	}

	@RequestMapping(value = "logout", method = RequestMethod.POST)
	@RestfulComment(value = "注销", params = "登录参数")
	public ResponseEntity<String> logout() {
		return successResult(userContext.logout());
	}

}
