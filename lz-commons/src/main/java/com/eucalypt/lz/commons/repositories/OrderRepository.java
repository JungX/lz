package com.eucalypt.lz.commons.repositories;

import com.eucalypt.framework.jpa.repository.BaseRepository;
import com.eucalypt.lz.commons.beans.Order;

public interface OrderRepository extends BaseRepository<Order, Long> {
	Order findFirstByDeviceTransactionalId(String deviceTransactionalId);
}
