package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.annotation.RestfulComment;
import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.core.entity.LoginBean;
import com.eucalypt.framework.core.security.UserContext;
import com.eucalypt.lz.commons.enums.Roles;
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

	@RequestMapping(value = "login", method = RequestMethod.POST)
	@RestfulComment(value = "登录", params = "登录参数")
	public ResponseEntity<String> login(@RequestBody LoginBean loginBean) {
		loginBean.setRoles(Roles.admin);
		String token = userContext.login(loginBean);
		if (token != null) {
			Map<String, String> result = new HashMap<String, String>();
			result.put("token", token);
			return successResult(result);
		} else {
			return errorResult("用户名或者密码不正确");
		}
	}

	@RequestMapping(value = "logout", method = RequestMethod.POST)
	@RestfulComment(value = "注销", params = "登录参数")
	public ResponseEntity<String> logout() {
		return successResult();
	}

}
