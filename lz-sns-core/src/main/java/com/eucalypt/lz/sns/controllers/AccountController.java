package com.eucalypt.lz.sns.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.framework.core.security.UserContext;
import com.eucalypt.framework.jpa.entity.PageQuery;
import com.eucalypt.lz.commons.services.OrderViewService;
import com.eucalypt.lz.commons.services.UserPledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/account")
public class AccountController extends UploadableController {

	@Autowired
	private UserContext userContext;

	@Autowired
	private OrderViewService orderViewService;

	@Autowired
	private UserPledgeService userPledgeService;

	@RequestMapping(value = "pledge", method = RequestMethod.POST)
	public ResponseEntity<String> getPledge() throws Exception {
		String userId = userContext.getCurrentUser().getId();
		return successResult(userPledgeService.getByUserId(userId));
	}

	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PageQuery pageQuery) throws Exception {
		String userId = userContext.getCurrentUser().getId();
		return successResult(orderViewService.listPagedByUserId(userId, pageQuery));
	}

}
