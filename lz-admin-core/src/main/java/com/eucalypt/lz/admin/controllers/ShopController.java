package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.controller.UploadableController;
import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.lz.commons.beans.Province;
import com.eucalypt.lz.commons.beans.Shop;
import com.eucalypt.lz.commons.services.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by zhaoyang on 17/4/1.
 */
@RestController
@RequestMapping("/restful/shop")
public class ShopController extends UploadableController {

	@Autowired
	private ShopService shopService;

	@RequestMapping(value = "save", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody Shop shop) throws Exception {
		return successResult(shopService.save(shop));
	}

	@RequestMapping(value = "get/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> get(@PathVariable("id") String id) throws Exception {
		return successResult(shopService.get(id));
	}

	@RequestMapping(value = "delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> delete(@PathVariable("id") String id) throws Exception {
		shopService.delete(id);
		return successResult();
	}

	@RequestMapping(value = "list/paged", method = RequestMethod.POST)
	public ResponseEntity<String> listPaged(@RequestBody PagedParam pagedParam) throws Exception {
		return successResult(shopService.listPaged(pagedParam));
	}

	@RequestMapping(value = "set/location/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> setLocation(@RequestBody Double[] coordinates, @PathVariable("id") String id) throws Exception {
		shopService.setLocation(id, coordinates);
		return successResult();
	}

	@RequestMapping(value = "list", method = RequestMethod.POST)
	public ResponseEntity<String> list(@RequestBody Province province) throws Exception {
		return successResult(shopService.listByProvince(province));
	}

	@RequestMapping(value = "set/cover/{id}", method = RequestMethod.POST)
	public ResponseEntity<String> setCoverImage(HttpServletRequest request, @PathVariable("id") String id) throws Exception {
		MultipartFile multipartFile = getMultipartFile(request);
		String fileId = saveFile(multipartFile);
		return successResult(shopService.setCoverImage(id, fileId));
	}

}
