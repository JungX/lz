package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.service.AbstractService;
import com.eucalypt.lz.commons.beans.Province;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProvincesService extends AbstractService<Province> {

	public List<Province> getProvinces() {
		return getDatastore().find(Province.class, "level", "1").order("code").asList();
	}

	public List<Province> getSubLevels(String code) {
		return getDatastore().find(Province.class, "parentCode", code).order("code").asList();
	}

	public Province getByCode(String code) {
		return get("code", code);
	}

	public List<Province> listByCodes(List<String> codes) {
		return getDatastore().find(Province.class).field("code").in(codes).asList();
	}

	@Override
	public Class<Province> getEntityClass() {
		return Province.class;
	}

}
