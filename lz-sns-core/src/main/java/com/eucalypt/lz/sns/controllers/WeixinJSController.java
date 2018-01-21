package com.eucalypt.lz.sns.controllers;

import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/restful/wx/sign")
public class WeixinJSController extends BaseController {

	@Autowired
	private WeixinDataServiceFactory factory;

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<String> getJSSignInfo(@RequestBody Map<String, String> paras, HttpServletRequest request) {
		try {
			String url = paras.get("url");
			Map<String, String> signInfo = factory.getWeixinDataService().getJSSign(url);
			return getSuccessResultBuilder().setResult(signInfo).build();
		} catch (Exception e) {
			e.printStackTrace();
			return getErrorResultBuilder().setErrorMessage(e.getMessage()).build();
		}
	}

}
