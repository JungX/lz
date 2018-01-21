package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.core.entity.PagedResults;
import com.eucalypt.framework.jpa.entity.PageQuery;
import com.eucalypt.framework.jpa.repository.BaseRepository;
import com.eucalypt.framework.jpa.service.AbstractService;
import com.eucalypt.lz.commons.beans.Order;
import com.eucalypt.lz.commons.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class OrderService extends AbstractService<Order> {

	@Autowired
	private OrderRepository orderRepository;

	public void create(Order order) {
		order.setPayDate(new Date());
		orderRepository.save(order);
	}

	@Override
	public BaseRepository getRepository() {
		return orderRepository;
	}

	public Order getByDeviceTransactionalId(String transactionId) {
		return orderRepository.findFirstByDeviceTransactionalId(transactionId);
	}

	public PagedResults<Order> listPagedByUserId(String userId, PageQuery pageQuery) {
		pageQuery.getQuery().put("userId", userId);
		return super.listPaged(pageQuery);
	}
}
