package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.PagedResults;
import com.eucalypt.framework.jpa.entity.PageQuery;
import com.eucalypt.framework.jpa.repository.BaseRepository;
import com.eucalypt.framework.jpa.service.AbstractService;
import com.eucalypt.lz.commons.beans.OrderView;
import com.eucalypt.lz.commons.repositories.OrderViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderViewService extends AbstractService<OrderView> {

	@Autowired
	private OrderViewRepository orderViewRepository;

	@Override
	public BaseRepository getRepository() {
		return orderViewRepository;
	}

	public PagedResults<OrderView> listPagedByUserId(String userId, PageQuery pageQuery) {
		pageQuery.getQuery().put("userId", userId);
		return super.listPaged(pageQuery);
	}
}
