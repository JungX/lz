package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.lz.commons.beans.Device;
import com.eucalypt.lz.commons.services.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/device")
public class DeviceController extends UploadableController {

	@Autowired
	private DeviceService deviceService;

	@RequestMapping(value = "save", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody Device device) throws Exception {
		return successResult(deviceService.save(device));
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> get(@PathVariable("id") String id) throws Exception {
		return successResult(deviceService.get(id));
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> delete(@PathVariable("id") String id) throws Exception {
		deviceService.delete(id);
		return successResult();
	}

	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PagedParam pagedParam) throws Exception {
		return successResult(deviceService.listPaged(pagedParam));
	}

	@RequestMapping(value = "set/location/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> setLocation(@RequestBody Double[] coordinates, @PathVariable("id") String id) throws Exception {
		deviceService.setLocation(id, coordinates);
		return successResult();
	}

}
