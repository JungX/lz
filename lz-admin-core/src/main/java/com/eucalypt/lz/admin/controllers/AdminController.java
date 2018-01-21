package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.framework.core.security.UserContext;
import com.eucalypt.lz.commons.beans.AdminUser;
import com.eucalypt.lz.commons.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Created by zhaoyang on 16/11/29.
 */
@RestController
@RequestMapping("/restful/admin")
public class AdminController extends BaseController {

	@Autowired
	private UserContext userContext;

	@Autowired
	private AdminService adminService;

	@RequestMapping(value = "current", method = RequestMethod.POST)
	public ResponseEntity<String> get() throws Exception {
		return successResult(userContext.getCurrentUser());
	}


	@RequestMapping(value = "/mp", method = RequestMethod.POST)
	public ResponseEntity<String> modifyPassword(
			@RequestBody Map<String, String> datas) throws Exception {
		AdminUser user = userContext.getCurrentUser();
		String oldPassword = datas.get("oldPassword");
		String newPassword = datas.get("newPassword");
		adminService
				.modifyPassword(user.getUsername(), oldPassword, newPassword);
		return successResult();
	}

	@RequestMapping(value = "create", method = RequestMethod.POST)
	public ResponseEntity<String> create(@RequestBody AdminUser adminUser) throws Exception {
		adminUser.setPassword(adminUser.getUsername());
		return successResult(adminService.create(adminUser));
	}

	@RequestMapping(value = "save", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody AdminUser adminUser) throws Exception {
		return successResult(adminService.save(adminUser));
	}

	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PagedParam pagedParam) throws Exception {
		return successResult(adminService.listPaged(pagedParam));
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> delete(@PathVariable("id") String id) throws Exception {
		adminService.delete(id);
		return successResult();
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> get(@PathVariable("id") String id) throws Exception {
		return successResult(adminService.get(id));
	}
}
