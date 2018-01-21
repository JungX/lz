package com.eucalypt.lz.commons.services;

import com.eucalypt.framework.jpa.repository.BaseRepository;
import com.eucalypt.framework.jpa.service.AbstractService;
import com.eucalypt.lz.commons.beans.DeviceTransaction;
import com.eucalypt.lz.commons.enums.DeviceTransactionStatus;
import com.eucalypt.lz.commons.enums.ProductType;
import com.eucalypt.lz.commons.repositories.DeviceTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeviceTransactionService extends AbstractService<DeviceTransaction> {

	@Autowired
	private DeviceTransactionRepository deviceTransactionRepository;

	@Autowired
	private UserPledgeService userPledgeService;

	@Override
	public BaseRepository getRepository() {
		return deviceTransactionRepository;
	}

	@Transactional
	public DeviceTransaction create(DeviceTransaction deviceTransaction) {
		if (deviceTransaction.getStatus() == DeviceTransactionStatus.abnormalEnd) {
			userPledgeService.decrease(deviceTransaction.getUserId(), ProductType.PLEDGE.getAmount());
		}
		return deviceTransactionRepository.save(deviceTransaction);
	}
}
