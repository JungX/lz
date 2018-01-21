package com.eucalypt.lz.server.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.framework.weixin.entity.WeixinUserAccessToken;
import com.eucalypt.framework.weixin.exception.WeixinAccessException;
import com.eucalypt.framework.weixin.service.IWeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.lz.commons.enums.OrderType;
import com.eucalypt.lz.commons.enums.ProductType;
import com.eucalypt.lz.commons.services.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/pay")
public class PayController extends UploadableController {

	@Autowired
	private PayService payService;

	@Autowired
	private WeixinDataServiceFactory weixinDataServiceFactory;

	@RequestMapping(value = "pay/continue", method = RequestMethod.POST)
	public ResponseEntity<String> continuePay(HttpServletRequest request, @RequestBody Map<String, String> data) throws Exception {
		return _pay(request, data);
	}

	@RequestMapping(value = "pay", method = RequestMethod.POST)
	public ResponseEntity<String> pay(HttpServletRequest request, @RequestBody Map<String, String> data) throws Exception {
		return _pay(request, data);
	}

	private ResponseEntity<String> _pay(HttpServletRequest request, Map<String, String> data) throws WeixinAccessException {
		String code = data.get("code");
		String openId = data.get("openId");
		OrderType orderType = OrderType.valueOf(data.get("orderType"));
		String deviceId = data.get("deviceId");
		ProductType productType = ProductType.valueOf(data.get("productType"));
		if (orderType == OrderType.game && deviceId == null) {
			return errorResult("设备信息错误");
		}

		if (openId != null) {
			return successResult(payService.pay(request, deviceId, openId, orderType, productType));
		} else if (code != null) {
			IWeixinDataService weixinDataService = weixinDataServiceFactory.getWeixinDataService();
			WeixinUserAccessToken token = weixinDataService.fetchUserAccessToken(code);
			if (token != null) {
				openId = token.getOpenid();
				return successResult(payService.pay(request, deviceId, openId, orderType, productType));
			} else {
				return errorResult("不能获取用户身份");
			}
		} else {
			return errorResult("不能获取用户身份");
		}
	}

}
