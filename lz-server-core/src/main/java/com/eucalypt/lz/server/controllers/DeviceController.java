package com.eucalypt.lz.server.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.lz.commons.beans.DeviceTransaction;
import com.eucalypt.lz.commons.beans.Order;
import com.eucalypt.lz.commons.enums.DeviceTransactionStatus;
import com.eucalypt.lz.commons.enums.OrderType;
import com.eucalypt.lz.commons.services.DeviceAdImageService;
import com.eucalypt.lz.commons.services.DeviceService;
import com.eucalypt.lz.commons.services.DeviceTransactionService;
import com.eucalypt.lz.commons.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/device")
public class DeviceController extends UploadableController {

	@Autowired
	private DeviceService deviceService;

	@Autowired
	private DeviceAdImageService deviceAdImageService;

	@Autowired
	private DeviceTransactionService deviceTransactionService;

	@Autowired
	private OrderService orderService;

	@RequestMapping(value = "near", method = RequestMethod.POST)
	public ResponseEntity<String> topic(@RequestBody Double[] coordinates) throws Exception {
		return successResult(deviceService.listNearDevices(coordinates));
	}

	@RequestMapping(value = "report", method = RequestMethod.POST)
	public ResponseEntity<String> report(@RequestBody Map<String, Object> data) throws Exception {
		return successResult(data);
	}

	@RequestMapping(value = "complete", method = RequestMethod.POST)
	public ResponseEntity<String> complete(@RequestBody Map<String, String> data) throws Exception {
		DeviceTransactionStatus status = DeviceTransactionStatus.parse(data.get("status"));
		String transactionalId = data.get("transactionalId");
		Order order = orderService.getByDeviceTransactionalId(transactionalId);
		if (order != null) {
			DeviceTransaction deviceTransaction = new DeviceTransaction();
			deviceTransaction.setDeviceId(order.getDeviceId());
			deviceTransaction.setDeviceTransactionId(transactionalId);
			deviceTransaction.setStatus(status);
			deviceTransaction.setUserId(order.getUserId());
			deviceTransactionService.create(deviceTransaction);
		}
		return successResult(data);
	}

	@RequestMapping(value = "qrCode/{deviceId}/{orderType}", method = RequestMethod.GET)
	public void generateQRCode(@PathVariable("deviceId") String deviceId, @PathVariable("orderType") OrderType orderType, HttpServletResponse response) throws Exception {
		response.setContentType("image/png");
		deviceService.generateQRCode(deviceId, orderType, response.getOutputStream());
	}

	@RequestMapping(value = "ad/images", method = RequestMethod.POST)
	public ResponseEntity<String> listDevAdImages() throws Exception {
		return successResult(deviceAdImageService.list());
	}
}
