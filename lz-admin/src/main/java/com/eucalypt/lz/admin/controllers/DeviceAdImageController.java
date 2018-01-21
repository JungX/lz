package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.lz.commons.services.DeviceAdImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/device/ad/image")
public class DeviceAdImageController extends UploadableController {

	@Autowired
	private DeviceAdImageService deviceAdImageService;

	@RequestMapping(value = "list", method = RequestMethod.POST)
	public ResponseEntity<String> save() throws Exception {
		return successResult(deviceAdImageService.list());
	}

	@RequestMapping(value = "add", method = RequestMethod.POST)
	public ResponseEntity<String> addImage(HttpServletRequest request) throws Exception {
		MultipartFile multipartFile = getMultipartFile(request);
		String fileId = saveFile(multipartFile);
		deviceAdImageService.addImage(fileId);
		return successResult(fileId);
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> delete(@PathVariable("id") String id) throws Exception {
		return successResult(deviceAdImageService.removeImage(id));
	}

	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PagedParam pagedParam) throws Exception {
		return successResult(deviceAdImageService.listPaged(pagedParam));
	}

}
