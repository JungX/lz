package com.eucalypt.lz.server.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.lz.commons.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/shop")
public class ShopController extends UploadableController {

	@Autowired
	private ShopService shopService;

	@RequestMapping(value = "get/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> get(@PathVariable("id") String id) throws Exception {
		return successResult(shopService.get(id));
	}
}
