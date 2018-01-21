package com.eucalypt.lz.sns.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.framework.core.security.UserContext;
import com.eucalypt.lz.commons.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/user")
public class UserController extends UploadableController {

	@Autowired
	private UserContext userContext;

	@Autowired
	private UserService userService;

	@RequestMapping(value = "current", method = RequestMethod.POST)
	public ResponseEntity<String> getCurrent() throws Exception {
		String userId = userContext.getCurrentUser().getId();
		return successResult(userService.get(userId));
	}

}
