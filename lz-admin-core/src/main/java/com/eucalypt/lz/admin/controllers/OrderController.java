package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.jpa.entity.PageQuery;
import com.eucalypt.lz.commons.services.OrderService;
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
@RequestMapping("/restful/order")
public class OrderController extends BaseController {

	@Autowired
	private OrderService orderService;


	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PageQuery pageQuery) throws Exception {
		return successResult(orderService.listPaged(pageQuery));
	}

}
