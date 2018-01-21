package com.eucalypt.lz.server.controllers;

import com.eucalypt.framework.core.annotation.RestfulComment;
import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.framework.core.utils.Utils;
import com.eucalypt.framework.core.utils.XMLConverUtil;
import com.eucalypt.framework.weixin.service.WeixinPayNotifyService;
import com.eucalypt.lz.commons.beans.Order;
import com.eucalypt.lz.commons.beans.UserPledge;
import com.eucalypt.lz.commons.enums.DeviceRunType;
import com.eucalypt.lz.commons.enums.OrderStatus;
import com.eucalypt.lz.commons.enums.OrderType;
import com.eucalypt.lz.commons.enums.ProductType;
import com.eucalypt.lz.commons.services.DeviceService;
import com.eucalypt.lz.commons.services.OrderService;
import com.eucalypt.lz.commons.services.UserPledgeService;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/weixin/pay/")
public class WeixinPayController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(WeixinPayController.class);

	@Autowired
	private WeixinPayNotifyService payNotifyService;

	@Autowired
	private OrderService orderService;

	@Autowired
	private UserPledgeService userPledgeService;

	@Autowired
	private DeviceService deviceService;

	// 支付回调
	@RequestMapping(value = "callback")
	@RestfulComment("微信支付回调入口")
	@Transactional
	public void callback(HttpServletRequest req, HttpServletResponse resp) {
		resp.setCharacterEncoding("utf-8");
		resp.setContentType("text/xml; charset=utf-8");
		PrintWriter out = null;
		String remoteIp = Utils.getIpAddress(req);
		try {
			req.setCharacterEncoding("utf-8");
			InputStream reqBody = req.getInputStream();
			out = resp.getWriter();
			String content = IOUtils.toString(reqBody);
			Map payNotifyMap = XMLConverUtil.convertToMap(content);
			logger.info("pay notify :{}", content);
			String openId = (String) payNotifyMap.get("openid");
			String transactionId = (String) payNotifyMap.get("transaction_id");
			String attach = (String) payNotifyMap.get("attach");
			String[] attachs = attach.split("\\|");
			String deviceId = attachs[0];
			OrderType orderType = OrderType.valueOf(attachs[1]);
			String userId = attachs[2];
			ProductType productType = ProductType.valueOf(attachs[3]);
//			JSONObject attachObj = JSONObject.fromObject(attach);
//			String userId = (String) attachObj.get("userId");
//			String deviceId = (String) attachObj.get("deviceId");
//			OrderType orderType = OrderType.valueOf((String) attachObj.get("orderType"));
//			ProductType productType = ProductType.valueOf((String) payNotifyMap.get("out_trade_no"));
			Integer mins = productType.getMins();
			BigDecimal amount = productType.getAmount();
			String deviceTransactionalId = KeyGenerators.string().generateKey();
			Order order = new Order();
			order.setTransactionId(transactionId);
			order.setOpenId(openId);
			order.setUserId(userId);
			order.setDeviceId(deviceId);
			order.setType(orderType);
			order.setProductType(productType);
			order.setMins(productType.getMins());
			order.setAmount(amount);
			order.setStatus(OrderStatus.paid);
			order.setDeviceTransactionalId(deviceTransactionalId);
			orderService.create(order);

			if (orderType == OrderType.pledge) {
				UserPledge pledge = new UserPledge();
				pledge.setUserId(userId);
				pledge.setOpenId(openId);
				pledge.setAmount(amount);
				userPledgeService.update(pledge);
			} else if (orderType == OrderType.game) {
				deviceService.send(deviceId, mins, DeviceRunType.startGame, deviceTransactionalId);
			} else if (orderType == OrderType.continueGame) {
				deviceService.send(deviceId, mins, DeviceRunType.continueGame, deviceTransactionalId);
			}

			out.print("<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>");
			out.flush();
		} catch (Exception e) {
			out.print("<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>");
			out.flush();
			logger.error("pay notify error", e);
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
		}
	}
}
