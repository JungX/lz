package com.eucalypt.lz.admin.controllers;

import com.eucalypt.framework.core.annotation.RestfulComment;
import com.eucalypt.framework.core.controller.BaseController;
import com.eucalypt.lz.commons.services.ProvincesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restful/provinces")
@RestfulComment(catalog = "地区管理")
public class ProvincesController extends BaseController {

	private static final Logger logger = LoggerFactory.getLogger(ProvincesController.class);

	@Autowired
	private ProvincesService service;

	@RequestMapping(value = "/provinces", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@RestfulComment(value = "获取省份列表")
	public ResponseEntity<String> getProvinces() {
		try {
			return getSuccessResultBuilder().setResult(service.getProvinces()).build();
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getErrorResultBuilder("获取省份列表时发生错误").setErrorMessage(e.getMessage()).build();
		}
	}

	@RequestMapping(value = "/cities/{code}", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@RestfulComment(value = "获取城市列表")
	public ResponseEntity<String> getCities(@PathVariable("code") String code) {
		try {
			return getSuccessResultBuilder().setResult(service.getSubLevels(code)).build();
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getErrorResultBuilder("获取城市列表时发生错误").setErrorMessage(e.getMessage()).build();
		}
	}

	@RequestMapping(value = "/areas/{code}", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@RestfulComment(value = "获取地区列表")
	public ResponseEntity<String> getAreas(@PathVariable("code") String code) {
		try {
			return getSuccessResultBuilder().setResult(service.getSubLevels(code)).build();
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getErrorResultBuilder("获取地区列表时发生错误").setErrorMessage(e.getMessage()).build();
		}
	}

	@RequestMapping(value = "/get/{code}", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
	@RestfulComment(value = "根据code获取一个区域实例")
	public ResponseEntity<String> get(@PathVariable("code") String code) {
		try {
			return getSuccessResultBuilder().setResult(service.getByCode(code)).build();
		} catch (Exception e) {
			logger.error(e.getMessage());
			return getErrorResultBuilder("获取时发生错误").setErrorMessage(e.getMessage()).build();
		}
	}
}
