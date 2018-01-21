package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.exception.MessageException;
import com.eucalypt.framework.core.utils.RandomStringGenerator;
import com.eucalypt.framework.core.utils.Utils;
import com.eucalypt.framework.weixin.entity.PayPackage;
import com.eucalypt.framework.weixin.entity.TradeType;
import com.eucalypt.framework.weixin.entity.UnifiedorderCallback;
import com.eucalypt.framework.weixin.service.WeixinDataService;
import com.eucalypt.framework.weixin.service.WeixinDataServiceFactory;
import com.eucalypt.framework.weixin.service.WeixinPayService;
import com.eucalypt.lz.commons.beans.User;
import com.eucalypt.lz.commons.beans.UserPledge;
import com.eucalypt.lz.commons.enums.OrderType;
import com.eucalypt.lz.commons.enums.ProductType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.keygen.KeyGenerators;

import javax.servlet.http.HttpServletRequest;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class PayService {
	private static final Logger logger = LoggerFactory.getLogger(PayService.class);

	@Autowired
	private WeixinPayService weixinPayService;

	@Autowired
	private WeixinDataServiceFactory weixinDataServiceFactory;

	@Autowired
	private UserService userService;

	@Autowired
	private UserPledgeService userPledgeService;

	public Map<String, String> pay(HttpServletRequest request, String deviceId, String openId, OrderType orderType, ProductType productType) {
		try {
			User user = userService.getByOpenId(openId);
			WeixinDataService weixinDataService = (WeixinDataService) weixinDataServiceFactory.getWeixinDataService();
			userService.save(user);
			PayPackage payPackage = new PayPackage();
			String attach = deviceId + "|" + orderType.name() + "|" + user.getId() + "|" + productType.name();
			payPackage.setAttach(attach);
			payPackage.setBody("支付订单");
			payPackage.setNonce_str(RandomStringGenerator.getRandomStringByLength(32));
			payPackage.setOpenid(openId);
			payPackage.setOut_trade_no(KeyGenerators.string().generateKey());
			payPackage.setAppid(weixinDataService.getAppId());
			String clientIp = Utils.getIpAddress(request);
			payPackage.setSpbill_create_ip(clientIp);
			if (productType == ProductType.PLEDGE) {
				UserPledge userPledge = userPledgeService.getByUserId(user.getId());
				if (userPledge == null || userPledge.getAmount().intValue() < ProductType.PLEDGE.getAmount().intValue()) {
					payPackage.setTotal_fee(String.valueOf(new BigDecimal(productType.getAmount().floatValue() * 100).intValue()));
				}
			} else {
				payPackage.setTotal_fee(String.valueOf(new BigDecimal(productType.getAmount().floatValue() * 100).intValue()));
			}
			payPackage.setTrade_type(TradeType.JSAPI.toString());
			weixinPayService.decoratePayPackage(payPackage);
			UnifiedorderCallback unifiedorderCallback = weixinPayService.generatePayNativeReplyXML(payPackage);
			if (unifiedorderCallback.getReturn_code().equals("SUCCESS")
					&& unifiedorderCallback.getResult_code().equals("SUCCESS")) {
				String prepayId = unifiedorderCallback.getPrepay_id();
				Map<String, String> result = new HashMap<String, String>();
				result.put("prepayId", prepayId);

				Map<String, String> signInfo = weixinPayService.getSignInfo(prepayId);

				signInfo.put("packeagestr", signInfo.get("package"));
				signInfo.put("paySwitch", "true");
				return signInfo;
			} else {
				throw new MessageException(unifiedorderCallback.getReturn_msg());
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw new MessageException("支付时发生错误");
		}
	}

}
