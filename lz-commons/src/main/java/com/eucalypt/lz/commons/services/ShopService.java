package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.PagedParam;
import com.eucalypt.framework.core.entity.PagedResults;
import com.eucalypt.framework.core.service.AbstractService;
import com.eucalypt.framework.core.service.FileEntityService;
import com.eucalypt.lz.commons.beans.Province;
import com.eucalypt.lz.commons.beans.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopService extends AbstractService<Shop> {

	@Autowired
	private FileEntityService fileEntityService;

	@Override
	protected Class<Shop> getEntityClass() {
		return Shop.class;
	}

	@Override
	public PagedResults<Shop> listPaged(PagedParam pagedParam) {
		return super.listPaged(pagedParam);
	}

	@Override
	public void delete(String id) {
		super.delete(id);
	}

	@Override
	public Shop get(String id) {
		return super.get(id);
	}

	@Override
	public String save(Shop entity) {
		return super.save(entity);
	}

	public void setLocation(String id, Double[] coordinates) {
		super.update(id, "coordinates", coordinates);
	}

	public List<Shop> listByProvince(Province province) {
		return createQuery().field("province.code").equal(province.getCode()).asList();
	}

	public String setCoverImage(String id, String coverImageId) {
		Shop playground = get(id);
		if (playground.getCoverImage() != null) {
			fileEntityService.delete(playground.getCoverImage());
		}
		playground.setCoverImage(coverImageId);
		super.save(playground);
		return coverImageId;
	}
}
