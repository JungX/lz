package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.lz.commons.beans.SystemSetting;
import com.eucalypt.lz.commons.beans.SystemSettingService;
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
@RequestMapping("/restful/sys/setting")
public class SystemSettingController extends BaseController {

	@Autowired
	private SystemSettingService systemSettingService;

	@RequestMapping(value = "save", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody SystemSetting systemSetting) throws Exception {
		return successResult(systemSettingService.save(systemSetting));
	}

	@RequestMapping(value = "get", method = RequestMethod.POST)
	public ResponseEntity<String> get() throws Exception {
		return successResult(systemSettingService.get());
	}
}
