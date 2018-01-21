package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.lz.commons.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zhaoyang on 16/11/29.
 */
@RestController
@RequestMapping("/restful/user")
public class UserController extends BaseController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PagedParam pagedParam) throws Exception {
		return successResult(userService.listPaged(pagedParam));
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> get(@PathVariable("id") String id) throws Exception {
		return successResult(userService.get(id));
	}

}
